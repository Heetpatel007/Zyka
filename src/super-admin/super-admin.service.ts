import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Business, BusinessDocument } from '../business/business.schema';
import { Model } from 'mongoose';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(Business.name) private businessModel: Model<BusinessDocument>
  ) {}

  async getAllBusinesses() {
    return this.businessModel.find().lean();
  }

  async approveBusiness(bizId: string) {
    const business = await this.businessModel.findById(bizId);
    if (!business) throw new NotFoundException('Business not found');
    if (business.isApproved) throw new ForbiddenException('Business already approved');

    business.isApproved = true;
    await business.save();

    return { message: 'Business approved by Super Admin', business };
  }
}
