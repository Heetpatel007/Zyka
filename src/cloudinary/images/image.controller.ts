import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: (req, file, cb) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|)$/)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
  }))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.upload(file);
  }

  @Get()
  async getAllImages() {
    return this.imageService.findAll();
  }
}
