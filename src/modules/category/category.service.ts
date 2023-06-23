import { categories } from './../../../node_modules/.prisma/client/index.d';
import { Injectable, BadRequestException  } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CategoryService {
  private readonly prisma:any;
  constructor(){
    this.prisma = new PrismaClient();
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const catrgory = await this.prisma.categories.create({data: {...createCategoryDto}})
    if(catrgory){
      return {
        catrgory,
        message: 'Create successfully.',
        success: true
      }
    }else{
      throw new BadRequestException('fail to create category.')
    }
  }

  async findAll() {
    const catrgory =  await this.prisma.categories.findMany({ include:{posts: true}});
    if(catrgory){
      return {
        catrgory
      }
    }else{
      throw new BadRequestException(`Fail to get category`);
    }
  }

  async findOne(id: number) {
    const catrgory =  await this.prisma.categories.findUnique({where: {id: Number(id), include:{posts: true}}});
    if(catrgory){
      return {
        catrgory
      }
    }else{
      throw new BadRequestException(`Fail to get category`);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category =  await this.prisma.categories.update({
      data:{ ...updateCategoryDto },
      where: {id: Number(id)}
    });
    if(category){
      return category
    }else{
      throw new BadRequestException(`Fail to update category`);
    }
  }

  async remove(id: number) {
    const category = await this.prisma.categories.delete({where: {id: Number(id)}});
    if(category){
      return 'Category has been deleted.'
    }else{
      throw new BadRequestException(`Fail to delet category`);
    }
  }

}
