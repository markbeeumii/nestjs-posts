import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma_modules/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {JwtModule} from '@nestjs/jwt'

@Module({
  imports : [JwtModule.register({})],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}