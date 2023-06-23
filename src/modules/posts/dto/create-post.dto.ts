import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger'

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title : string

  @ApiProperty()
  @IsOptional()
  content? : string

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  authorId : number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number

}
