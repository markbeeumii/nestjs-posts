import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
  imports : [JwtModule.register({})],
})
export class PostsModule {}
