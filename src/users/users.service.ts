import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Business, BusinessDocument } from '../business/business.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>,
  ) {}
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }
  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new Error('User not found');

    const userObj = user.toObject();
    delete (userObj as { password?: string }).password;
    return userObj;
  }

  async create(userData: Partial<User>): Promise<User> {
    let business: BusinessDocument | null = null;

    if (userData.role === 'admin') {
      // Business name is required
      if (!userData.businessName) {
        throw new Error('Business name is required for admin registration');
      }

      // Create real Business document
      business = await this.businessModel.create({
        name: userData.businessName,
        category: userData.businessCategory || [],
        isVerified: false,
      }) as BusinessDocument;

      userData.bizId = (business._id as any).toString();
    }

    const createdUser = new this.userModel(userData);
    const savedUser = await createdUser.save();

    // Set createdBy field in Business``
    if (business) {
      business.createdBy = savedUser._id as any; // Cast to ObjectId if needed
      await business.save();
    }

    return savedUser;
  }
 
  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async updateById(id: string, update: Partial<any>): Promise<any> {
    // Replace 'any' with your actual User type if available
    return this.userModel.findByIdAndUpdate(id, update, { new: true });
  }

  async findOrCreateOAuthUser(profile: any): Promise<User> {
    let user = await this.userModel.findOne({
      oauthProvider: profile.provider,
      oauthId: profile.id,
    });

    if (!user) {
      user = new this.userModel({
        firstName: profile.name?.givenName || '',
        lastName: profile.name?.familyName || '',
        email: profile.emails?.[0]?.value,
        oauthProvider: profile.provider,
        oauthId: profile.id,
        role: 'user',
      });
      await user.save();
    }

    return user;
  }

  async updatePasswordByEmail(email: string, hashedPassword: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException('User not found');

    user.password = hashedPassword;
    return user.save();
  }
}
