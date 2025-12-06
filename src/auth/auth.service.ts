import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RedisService } from 'src/redis/redis.service';
import { Role, User } from 'src/users/schemas/user.schema';
import * as sgMail from '@sendgrid/mail';
import { Business, BusinessDocument } from 'src/business/business.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisService: RedisService,
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
  ) {}

  async register(data: any): Promise<any> {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      ...data,
      password: hashed,
      isVerified: false,
    });
    const tokens = await this.login(user);
    return { ...tokens, user };
  }

  async login(user: any) {
    let business: BusinessDocument | null = null;

    if (user.bizId) {
      business = await this.businessModel.findById(user.bizId).lean() as BusinessDocument | null; // ✅ .lean() for plain object

      // Optional: sync isVerified
      if (business?.isVerified && !user.isVerified) {
        await this.usersService.updateById(user._id, { isVerified: true });
        user.isVerified = true;
      }
    }

    const payload = {
      email: user.email,
      sub: user._id,
      role: user.role,
      bizId: user.bizId || null,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRY,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRY,
    });

    await this.redisService.setRefreshToken(user._id, refreshToken);

    return {
      accessToken,
      refreshToken,
      bizId: user.bizId || null,
      isVerified: business?.isVerified || false,
      user: {
        ...(user.toObject?.() || user),
        isVerified: business?.isVerified || false,
        aadhar: business?.aadhar || null,
        pan: business?.pan || null,
        gst: business?.gst || null,
        address: business?.address || null,
        businessName: business?.name || user.businessName,
        businessCategory: business?.category || user.businessCategory,
      },
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async logout(_id: string) {
    await this.redisService.removeRefreshToken(_id);
    return { message: 'Logged out' };
  }

  async refresh(_id: string, refreshToken: string) {
    const storedToken = await this.redisService.getRefreshToken(_id);
    if (storedToken !== refreshToken)
      throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersService.findById(_id);
    if (!user) throw new UnauthorizedException('User not found');

    return this.login(user);
  }

  async sendOtpForPasswordReset(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.redisService.set(`otp:${email}`, otp, 600);

    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) throw new Error('SendGrid API key is not defined');
    sgMail.setApiKey(apiKey);

    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    if (!fromEmail) throw new Error('SendGrid FROM email is not defined');
    console.log('Sending OTP from:', fromEmail, 'to:', email);

    await sgMail.send({
      to: email,
      from: fromEmail,
      subject: 'Your Password Reset OTP',
      text: `Your OTP is: ${otp}. It is valid for 10 minutes.`,
    });

    return { message: 'OTP sent successfully' };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const storedOtp = await this.redisService.get(`otp:${email}`);
    if (!storedOtp || storedOtp !== otp) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.usersService.updatePasswordByEmail(email, hashed);

    await this.redisService.delete(`otp:${email}`);
    return { message: 'Password reset successful' };
  }
}
