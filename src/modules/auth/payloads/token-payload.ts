
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

import {ApiProperty,ApiHeader} from '@nestjs/swagger'

export class TokenPayload{

  @ApiProperty({
    description: 'token',
    name: 'authorization',
    type: String,
    example: 'Bearer safwtwj352',
  })
  @IsNotEmpty()
  @IsString()
  token : string

}