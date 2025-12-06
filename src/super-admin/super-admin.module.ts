import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from '../business/business.schema';
import { SuperAdminController } from './super-admin.controller';
import { SuperAdminService } from './super-admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Business.name, schema: BusinessSchema }])
  ],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}
