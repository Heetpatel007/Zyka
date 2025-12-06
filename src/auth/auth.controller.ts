import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forget-password.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    const loginResult = await this.authService.login(user);
    // Return both login result and user details
    return {
      ...loginResult,
      user,
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req) {
    return this.authService.logout(req.user._id);
  }

  @Post('refresh')
  async refresh(@Body() body: { _id: string; refreshToken: string }) {
    return this.authService.refresh(body._id, body.refreshToken);
  }

  // Google OAuth
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.sendOtpForPasswordReset(dto.email);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.email, dto.otp, dto.newPassword);
  }
}
