
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';

import {ApiProperty} from '@nestjs/swagger'

export class ResetPayload{
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email : string

  @ApiProperty()
  @IsString()
  password : string

  @ApiProperty()
  @IsString()
  confirmpassword : string

}

/*

  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  token : string

*/