import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from '../business/business.schema';
import { BusinessVerificationController } from './business-verification.controller';
import { BusinessVerificationService } from './business-verification.service';
import { User, UserSchema } from '../users/schemas/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema },
       { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [BusinessVerificationController],
  providers: [BusinessVerificationService],
})
export class BusinessVerificationModule {}
