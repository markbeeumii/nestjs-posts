import { BadGatewayException, BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {Request} from 'express'
import {JwtService} from '@nestjs/jwt'
import { UserService } from '../users/user.service';
import { UserEntity } from '../users/entity/user.entity';
import { PrismaClient } from '@prisma/client';
import { Hash } from 'src/utils/bcryptType';
import *as nodemailer  from 'nodemailer'
import { EmailPayload } from './payloads/email-payload';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { ResetPayload } from './payloads/reset-payload';
import { TokenPayload } from './payloads/token-payload';

@Injectable()
export class AuthService {
  //private readonly logger = new Logger(AuthService.name);
  private readonly prsima = new PrismaClient()
  private readonly jwtservice: JwtService;
  private readonly userService: UserService;
  private readonly transporter : nodemailer.Transporter

  constructor(){
    this.jwtservice = new JwtService()
    this.prsima = new PrismaClient()
    this.userService = new UserService()
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        port: 587,
        auth: {
          user: process.env.ADMIN_EMAIL,
          pass: process.env.PASSWORD_EMAIL,
        },
      })
    );
  }

  async getToken(authorization: string): Promise<string>{
    const token = authorization.split(' ')[1]
    if(!token){
      throw new UnauthorizedException()
    }else{
      return token
    }
  }
  
  async login(userPayload: CreateAuthDto){

    const emailUser = await this.prsima.users.findUnique({where: {email: userPayload?.email}})
    
    if(!emailUser){
      throw new BadGatewayException(`User doesn't exist.`)
    }else{
      
      const verifyPassword = await Hash.compare(userPayload.password, emailUser.password);
      if(!(verifyPassword) || !(verifyPassword?.valueOf())){
        throw new BadGatewayException(`Password doesn't correct.`)
      }else{
        //const userLogin = {email: emailUser.email, sub: emailUser.id}
        const token = await this.jwtservice.sign(
          {email: emailUser.email},
          {
            secret: String(process.env.APP_SECRET_KEY),
            expiresIn : '2h'
          },
          )
        if(!token){
          throw new UnauthorizedException(`Unauthorized.`)
        }else{
          return {
            success: true,
            token : token
          }
          //console.log(token)
        }
      }
    }
  }

  async logout(){

  }

  async sendEmail(emailform : EmailPayload): Promise<any>{

    try{
      const info = await this.transporter.sendMail({
        from: process.env.ADMIN_EMAIL,  // Email Admin
        to: emailform.email_user,
        subject: process.env.ADMIN_EMAIL,
        template: `
          <button>Click me</button>
        `,
        context: process.env.APP_URL,
        text: `${emailform.message}`

      });
      
      if(!info){
        throw new BadRequestException(`Fail to push notification to ${emailform.email_user}`)
      }else{
        //console.log(`Message sent to ${emailform.email_user}: ${info.messageId}`);
        return {
          success: true,
          status : 'Done!'
        }
      }
    }catch(error){
      throw new BadRequestException(error)
    }

  }
 
  async resetPassword(resetRequest : ResetPayload, authorization: string): Promise<any>{
    
    try{
      const token = authorization.split(' ')[1] 
      if(!token){
        throw new UnauthorizedException()
      }
      
      const user = await this.prsima.users.findUnique({ where: { email: resetRequest.email}})
      if(!user){
        throw new BadGatewayException(`User doesn't exist.`)
      }
      const verified = await this.jwtservice.verify(token,{secret: process.env.APP_SECRET_KEY})
      
      if(!verified){
        throw new BadGatewayException(`Invalid token.`)
      }else if(verified.email !== user.email){
        throw new BadGatewayException(`User doesn't match.`)
      }
      if(resetRequest.password !== resetRequest.confirmpassword){
        throw new BadGatewayException(`Password must be the same.`)
      }

      const reset = await this.prsima.users.update({
        data: {password : resetRequest.password},
        where: {email: verified.email}
      })
      if(reset){
        return {
          success: true,
          status: 'Done',
          message: 'Reset password successfully.'
        }
      }else{
        throw new BadGatewayException(`Fail to reset password.`)
      }

    }catch(error){
      throw new BadGatewayException(`${error.message}`)
    }
  }

 /*
 
 
  async resetPassword(resetRequest : ResetPayload, authorization: string): Promise<any>{
    //console.log(req.headers.authorization)
    //console.log(this.getToken)
    
    try{
      const user = await this.prsima.users.findUnique({ where: { email: resetRequest.email}})
      if(!user){
        throw new BadGatewayException(`User doesn't exist.`)
      }
      const verified = await this.jwtservice.verify(resetRequest.token,{secret: process.env.APP_SECRET_KEY})
      
      if(!verified){
        throw new BadGatewayException(`Invalid token.`)
      }else if(verified.email !== user.email){
        throw new BadGatewayException(`User doesn't match.`)
      }
      if(resetRequest.password !== resetRequest.confirmpassword){
        throw new BadGatewayException(`Password must be the same.`)
      }

      const reset = await this.prsima.users.update({
        data: {password : resetRequest.password},
        where: {email: verified.email}
      })
      if(reset){
        return {
          success: true,
          status: 'Done',
          message: 'Reset password successfully.'
        }
      }else{
        throw new BadGatewayException(`Fail to reset password.`)
      }

    }catch(error){
      throw new BadGatewayException(`${error.message}`)
    }
  }

 

 
 
 
 create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  */

}
// function InjectRepository(UserEntity: any): (target: typeof AuthService, propertyKey: undefined, parameterIndex: 2) => void {
//   throw new Error('Function not implemented.');
// }

