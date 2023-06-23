import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/user.module';
import { PrismaModule } from '../../prisma_modules/prisma.module';
import { CategoryModule } from '../category/category.module';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    PrismaModule, 
    UserModule, 
    CategoryModule,
    PostsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  //exports: [AppService],
})
export class AppModule {}
