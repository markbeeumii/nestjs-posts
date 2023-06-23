import { TokenPayload } from './payloads/token-payload';
import { Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, Headers,
  BadRequestException, UseInterceptors, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiCreatedResponse, ApiHeader } from '@nestjs/swagger';
import { UserEntity } from '../users/entity/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserdto } from '../users/dto/create-user.dto';
import { EmailPayload } from './payloads/email-payload';
import { ResetPayload } from './payloads/reset-payload';
import { Request } from 'express';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController {
  usersSevice: any;
  constructor(private readonly authService: AuthService) {}

  @Post('/v1/login')
  @ApiCreatedResponse({})
  userLogin(@Body() userRequest: CreateAuthDto){
    try{
      return this.authService.login(userRequest)
    }catch(error){
      throw new BadRequestException(`${error}`)
    }
  }

  @Post('/v1/signup')
  @ApiCreatedResponse({type: UserEntity})
  @UseInterceptors(FileInterceptor('file'))
  userSignup(@Body() createuserDto: CreateUserdto){
    try{
      return this.usersSevice.create(createuserDto);
    }catch(error){
      throw new BadRequestException(error);
    };
  }

  @Post('/v1/push/email')
  @ApiCreatedResponse({ type: EmailPayload})
  async createEmail(@Body() emailForm : EmailPayload){
    try{
      return await this.authService.sendEmail(emailForm);
    }catch(error){
      throw new BadRequestException(error);
    }
  }

  @Get('token')
  async getToken(@Headers('authorization') authorization: string) {
    try{
      return await this.authService.getToken(authorization)
    }catch(error){
      throw new BadRequestException(error)
    }
  }

  /**
   * @swagger
   * /v1/resetpassword:
   *   post:
   *     summary: Reset password
   *     description: Resets user password
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ResetPayload'
   *     responses:
   *       '200':
   *         description: Password reset successful
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/ResetResponse'
   */

  @Post('/v1/resetpassword')
  @ApiCreatedResponse({ type: ResetPayload})
  async ResetPassword(
    @Body() resetRequest: ResetPayload, 
    @Headers('Authorization') authorization: string
    ){
      //console.log(authorization)
      try{
        return await this.authService.resetPassword(resetRequest, authorization)
      }catch(error){
        throw new UnauthorizedException(error);
      }
  }

  


 /* 





@Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
  */
}
