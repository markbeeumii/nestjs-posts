import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaService } from "src/prisma_modules/prisma.service";
import { CreateUserdto } from "./dto/create-user.dto";
import { BadRequestException } from "@nestjs/common";
import { Hash } from "src/utils/bcryptType";
import {ConfigService} from '@nestjs/config'

export class UserService {
  private readonly prisma : PrismaClient;
  private readonly configService = null;
  constructor(){
    this.prisma = new PrismaClient()
    this.configService= ConfigService
  }

  //Create User
  async create(creaseUserDto: CreateUserdto){
      const emailUnique = await this.prisma.users.findUnique({where: {email: creaseUserDto.email}})

      if(emailUnique){
        return {
          status: false,
          message: 'User exist!'
        }
      }else{
        const user = await this.prisma.users.create({
          data:{
            password: Hash.make(creaseUserDto.password),
            ...creaseUserDto
          }
        })
        if(user){
          return {
            user,
            success: true,
            message: 'User has been created s'
          }
        }else{
          throw new BadRequestException(`Fail to create user.`)
        }
      }
  }

  //Get All User 
  async findAll(){
    const user = await this.prisma.users.findMany()
    if(user){
      return{
        user
      }
    }else{
      throw new BadRequestException(`Fail to get user.`)
    }
  }

  //Get one user
  async findOne(id: number){
    const user = await this.prisma.users.findUnique({where: {id: Number(id)}, include: {posts: true}})
    try{
      if(user){
        return {
          user,
        }
      }else{
        throw new BadRequestException(`Fail to get user.`)
      }
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }

  //update user id=>
  async update(id:number, updateUserDto : CreateUserdto){
    const user = await this.prisma.users.findUnique({where: {id: Number(id)}})
    if(user){
      return {
        user,
        success: true,
        message: 'User has been updated successfully.'
      }
    }else{
      throw new BadRequestException(`Fail to update user.`)
    }
  }

  //Delete User id =>
  async remove(id:number) {
    const user =  await this.prisma.users.delete({where: {id : Number(id)}})
    if(user){
      return `User has been deleted.`
    }else{
      throw new BadRequestException(`Fail to delete user.`)
    }
  }

}