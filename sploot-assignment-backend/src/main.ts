import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import { join } from 'path';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(cookieParser())
  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true,
    transform: false
  }));
  app.use('/uploads', express.static(join(__dirname, '..', 'public', 'uploads')));
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();