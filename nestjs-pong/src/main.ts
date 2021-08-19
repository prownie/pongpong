import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const server = require('http').createServer(app);
  const io = require('socket.io')(server);

  await app.listen(3000); // Start on port 3000
}
bootstrap();
