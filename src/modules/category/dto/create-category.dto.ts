import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class CreateCategoryDto {

  @ApiProperty({required: true})
  @IsString()
  @IsNotEmpty()
  name : string

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string
}
