import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [StaffController],
  providers: [StaffService],
})
export class StaffModule {}
