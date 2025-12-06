import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  ValidateNested,
  IsString,
  IsArray,
  IsObject,
  isBoolean,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

// class ImgFileDto {
//   @IsNotEmpty()
//   @IsString()
//   adhar: string;

//   @IsNotEmpty()
//   @IsString()
//   pan: string;
// }

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;

  @IsOptional()
  @IsString()
  bizId?: string;

  @IsOptional()
  @IsString()
  businessName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  businessCategory?: string[];

  @IsBoolean()
  isVerified: boolean = false;


  // @IsOptional()
  // @IsString()
  // gstNumber?: string;

  // @IsOptional()
  // @ValidateNested()
  // @IsObject()
  // @Type(() => ImgFileDto)
  // imgFile?: ImgFileDto;
}
