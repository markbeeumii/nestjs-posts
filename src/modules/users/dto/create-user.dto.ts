import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class CreateUserdto{

  @IsOptional()
  @IsString()
  @ApiProperty()
  username: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ required: true})
  password: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  gender: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone_number: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  profile_picture: string
}