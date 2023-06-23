
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

export class EmailPayload {

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email_user :string

  @ApiProperty()
  @IsString()
  @IsOptional()
  message : string
}