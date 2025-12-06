import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Business } from '../business/business.schema';
import { Model } from 'mongoose';
import { CreateBusinessVerificationDto } from './dto/create-verification.dto';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()

export class BusinessVerificationService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<Business>,
    // @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async verifyBusinessByAdmin(
    userId: string,
    bizId: string,
    dto: CreateBusinessVerificationDto,
  ) {
    const business = await this.businessModel.findById(bizId);
    if (!business) throw new NotFoundException('Business not found');

    // Optional: You could check if the user is actually the owner (createdBy) of the business
    // if (business.createdBy.toString() !== userId) throw new ForbiddenException('Not your business');

    if (business.isVerified) {
      throw new ForbiddenException('Business is already verified');
    }

    business.aadhar = dto.aadhar;
    business.pan = dto.pan;
    business.gst = dto.gst;
    business.address = dto.address;
    business.isVerified = true;

   await business.save();

// Update the admin user's isVerified = true
await this.userModel.findByIdAndUpdate(userId, { isVerified: true });


    return {
      message: 'Business verified successfully',
      bizId: business._id,
      isVerified: true,
    };
  }
}
