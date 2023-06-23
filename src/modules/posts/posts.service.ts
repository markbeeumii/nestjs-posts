import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaClient } from '@prisma/client';
//import *as nodemailer  from 'nodemailer'

@Injectable()
export class PostsService {
  private readonly prisma =  new PrismaClient()
  constructor(){
    this.prisma = new PrismaClient();
  }

  async create(createPostDto: CreatePostDto) {
    const post = await this.prisma.posts.create({data: createPostDto})
    if(post){
      return {
        post,
        success: true,
        message : 'Create succeessfully.'
      }
    }else{
      throw new BadRequestException(`Fail to create post.`)
    }
  }

  async findAll() {
    //console.log(process.env.APP_SECRET_KEY)
    const post = await this.prisma.posts.findMany(
      { include: {
        authors: true, 
        category: true
       }
      }
    );

    if(post){
      return post
    }else{
      throw new BadRequestException(`Fail to get post.`)
    }

  }

  async findOne(id: number) {
    const post = await this.prisma.posts.findUnique({
      where: {
        id: Number(2),},
      include: { authors: true, category: true}
    });

    if(post){
      return post
    }else{
      throw new BadRequestException(`Fail to get post.`)
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    
    try{
        const post = await this.prisma.posts.update({
          data: updatePostDto,
          where: { id : Number(id)}
        });
        
        if(post){
          return post
        }else{
          throw new BadRequestException(`Fail to update post.`)
        }
    }catch(error){
      throw new BadRequestException(`Post doesn't exist.`)
    }

  }

  async remove(id: number) {
    try{
      const post = await this.prisma.posts.delete({where: {id : Number(id)}})
      if(post) return `Post has been delete successfully.`
      else throw new BadRequestException(`Fail to delete post.`)
    }catch(error){
      throw new BadRequestException(`Post doesn't exist in system.`)
    }
  }
}
