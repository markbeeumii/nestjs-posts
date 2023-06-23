import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserdto } from "./dto/create-user.dto";
import { json } from "stream/consumers";
import {FileInterceptor} from '@nestjs/platform-express'
import { UserEntity } from "./entity/user.entity";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guard/jwt-guard";
import { Public } from "src/common/decorator/public.decorator";
import { AuthGuard } from "src/common/guard/admin-guard";


@Controller(
  {
    path: 'api/v1/users',
    version: '1',
  }
)

@ApiBearerAuth()
@UseGuards(AuthGuard)

export class UserController {
  
  /**
   * Constructor
   * @param usersSevice  UserService
  */
  constructor(private readonly usersSevice : UserService){}

  /*@Post('/signup')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: UserEntity})
  create(@Body() createuserDto: CreateUserdto){
    try{
      return this.usersSevice.create(createuserDto);
    }catch(error){
      throw new BadRequestException(error);
    };
  }*/

  @Get()
  @ApiOkResponse({type: UserEntity, isArray: true})
  findAll(){
    try{
      return this.usersSevice.findAll();
    }catch(error){
      throw new BadRequestException(error);
    };
  }

  @Get(':id')
  @ApiOkResponse({type: UserEntity})
  async findOne(@Param('id', ParseIntPipe) id: number){
    try{
      return await this.usersSevice.findOne(id);
    }catch(error){
      throw new BadRequestException(error);
    };
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiCreatedResponse({ type: UserEntity})
  async update(@Param('id', ParseIntPipe) id : number, userUpdateDto: CreateUserdto){
    try{
      return await this.usersSevice.update(id, userUpdateDto)
    }catch(error){
      throw new BadRequestException(error);
    };
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id : number){
    try{
      return await this.usersSevice.remove(id)
    }catch(error){
      throw new BadRequestException(error);
    };
  }

}