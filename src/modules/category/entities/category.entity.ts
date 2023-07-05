import {categories} from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity implements categories {

  @ApiProperty()
  id : number

  @ApiProperty()
  name : string

  @ApiProperty()
  description : string

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

}
