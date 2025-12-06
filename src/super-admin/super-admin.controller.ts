import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  NotFoundException,
  ForbiddenException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorators';
import { Role } from '../users/schemas/user.schema';
import { Business, BusinessDocument } from '../business/business.schema';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@Controller('super-admin')
export class SuperAdminController {
  constructor(
    @InjectModel(Business.name)
    private readonly businessModel: Model<BusinessDocument>
  ) {}

  // ✅ Get all businesses (approved + unapproved)
  @Get('businesses')
  async getAllBusinesses() {
    const businesses = await this.businessModel.find().exec();
    return businesses;
  }

  // ✅ Approve business
  @Post('approve')
  async approveBusiness(@Body() body: { bizId: string }) {
    const business = await this.businessModel.findById(body.bizId);
    if (!business) {
      throw new NotFoundException('Business not found');
    }

    if (business.isApproved) {
      throw new ForbiddenException('Business already approved');
    }

    business.isApproved = true;
    await business.save();

    return {
      message: 'Business approved by Super Admin',
      business,
    };
  }
}
