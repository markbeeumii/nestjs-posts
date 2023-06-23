import { Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors, 
  BadGatewayException, 
  BadRequestException, 
  ParseIntPipe, 
  UseGuards} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CategoryEntity } from '../category/entities/category.entity';
import { PostsEntity } from './entities/post.entity';
import { AuthGuard } from 'src/common/guard/admin-guard';

@Controller({
  path: 'api/v1/posts',
  version: '1'
})
@UseInterceptors(FileInterceptor('file'))
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('/create')
  @ApiCreatedResponse({type: PostsEntity})
  create(@Body() createPostDto: CreatePostDto) {
    try{
      return this.postsService.create(createPostDto);
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }

  @Get()
  @ApiOkResponse({ type: PostsEntity, isArray: true})
  findAll() {
    try{
      return this.postsService.findAll();
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }

  @Get(':id')
  @ApiOkResponse({ type: PostsEntity, isArray: true})
  findOne(@Param('id',ParseIntPipe) id: number) {
    try{
      return this.postsService.findOne(id);
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostsEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    try{
      return this.postsService.update(id, updatePostDto);
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostsEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    try{
      return this.postsService.remove(id);
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }
}
