import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusinessVerificationDto {
  @IsNotEmpty()
  @IsString()
  aadhar: string;

  @IsNotEmpty()
  @IsString()
  pan: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  gst?: string;
}
