import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Business, BusinessSchema } from 'src/business/business.schema';
// import { UserController } from 'src/user/user.controller'; Have not been used from old file, might needd to flag this for future use

@Module({
  imports: [MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
  { name: Business.name, schema: BusinessSchema },
])],
  providers: [UsersService],
  controllers: [UsersController],//removed usercontroller from here as well
  exports: [UsersService],
})
export class UsersModule {}