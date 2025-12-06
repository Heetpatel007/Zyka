import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @IsNumber()
  itemPrice: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string; // Optional URL to uploaded image

  @IsString()
  @IsNotEmpty()
  bizId: string;
}
