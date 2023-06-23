import { ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors, 
  BadRequestException, 
  ParseIntPipe, 
  UseGuards} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryEntity } from './entities/category.entity';
import { AuthGuard } from 'src/common/guard/admin-guard';

@Controller({
  path: 'api/v1/category',
  version: '1'
})

@UseInterceptors(FileInterceptor('file'))
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('/create')
  @ApiCreatedResponse({ type: CategoryEntity})
  create(@Body() createCategoryDto: CreateCategoryDto) {
    try{
      return this.categoryService.create(createCategoryDto);
    }catch(error){
      throw new BadRequestException(error)
    }
  }

  @Get()
  @ApiOkResponse({ type: CategoryEntity, isArray: true})
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CategoryEntity,  isArray: true})
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CategoryEntity, isArray: true})
  update(@Param('id',ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    try{
      return this.categoryService.update(id, updateCategoryDto);
    }catch(error){
      throw new BadRequestException(error)
    }

  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    try{
      return this.categoryService.remove(id);
    }catch(error){
      throw new BadRequestException(error)
    }
  }

}
