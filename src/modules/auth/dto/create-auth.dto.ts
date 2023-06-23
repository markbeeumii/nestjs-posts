import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail
} from 'class-validator';

import {ApiProperty} from '@nestjs/swagger'


export class CreateAuthDto {
  @ApiProperty()
  username ?: string 

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email : string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string
}
