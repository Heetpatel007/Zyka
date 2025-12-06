// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });


  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (error, result) => {
          if (error) return reject(error);
          if (result?.secure_url) return resolve(result.secure_url);
          return reject(new Error('Upload failed.'));
        }
      );

      uploadStream.end(file.buffer);
    });
  }
}
