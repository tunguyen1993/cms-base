import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @Allow()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Allow()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;
}
