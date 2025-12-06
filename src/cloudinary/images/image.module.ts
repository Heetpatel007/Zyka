import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { Image, ImageSchema } from './schemas/image.schema';
import { CloudinaryService } from '../cloudinary.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])
  ],
  controllers: [ImageController],
  providers: [ImageService, CloudinaryService, ConfigService],
})
export class ImageModule {}
