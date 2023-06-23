import {posts} from '@prisma/client'
import {ApiProperty} from '@nestjs/swagger'

export class PostsEntity implements posts {
  
  @ApiProperty()
  id: number

  @ApiProperty()
  title: string

  @ApiProperty()
  content: string

  @ApiProperty()
  authorId : number

  @ApiProperty()
  categoryId : number

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
