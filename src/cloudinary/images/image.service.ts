import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary.service';
import { Image } from './schemas/image.schema';

@Injectable()
export class ImageService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectModel(Image.name) private readonly imageModel: Model<Image>,
  ) {}

  async upload(file: Express.Multer.File) {
    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return this.imageModel.create({ imageUrl });
  }

  async findAll() {
    return this.imageModel.find().exec();
  }
}
