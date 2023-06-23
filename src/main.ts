import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import {config} from 'dotenv'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  config();

  app.useGlobalPipes(new ValidationPipe)
  const options = new DocumentBuilder()
    .setTitle("Mark")
    .setDescription(`<h1 style='
    align-item:center;
    color: green !important;
    justify-content: center;
    background-color: red;
    display:flex;'> NestJS API</h1>`)
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(process.env.API_ROOT, app, document);
  await app.listen( process.env.APP_PORT || 3000);
  //console.log(ConfigService)
}

bootstrap();
