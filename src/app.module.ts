import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { StaffModule } from './staff/staff.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuModule } from './menu/menu.module';
import { ImageModule } from './cloudinary/images/image.module';
import { SuperAdminModule } from './super-admin/super-admin.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    RedisModule,
    UsersModule,
    SuperAdminModule,
    AuthModule,
    StaffModule,
    MenuModule,
    ImageModule
  ],
  controllers: [AppController],
  providers: [AppService]

})
export class AppModule { }
