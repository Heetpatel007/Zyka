import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/users/schemas/user.schema';

export class CreateUserDto {
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
  @IsEnum(Role)
  role?: Role;
}
