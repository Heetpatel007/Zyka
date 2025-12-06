import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateBusinessVerificationDto } from './dto/create-verification.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { BusinessVerificationService } from './business-verification.service';

@Controller('business-verification')
export class BusinessVerificationController {
  constructor(
    private readonly verificationService: BusinessVerificationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async verifyBusiness(
    @Body() dto: CreateBusinessVerificationDto,
    @Req() req,
  ) {
    const user = req.user;
    if (!user.bizId) throw new Error('Business ID not found for user');

    return this.verificationService.verifyBusinessByAdmin(user._id, user.bizId, dto);
  }
}
