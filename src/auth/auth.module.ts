import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RedisModule } from 'src/redis/redis.module';
import { BusinessVerificationModule } from 'src/business-verification/business-verification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Business, BusinessSchema } from '../business/business.schema';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    RedisModule,
    BusinessVerificationModule,
    MongooseModule.forFeature([
      { name: Business.name, schema: BusinessSchema }, // ✅ Register here
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
