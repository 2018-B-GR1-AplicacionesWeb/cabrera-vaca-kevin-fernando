import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const http_server = require('http-server');
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';

console.log(http_server)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(
      'ante la duda la mas tetuda',
      {
        //opciones
      }
  ));


    app.set('view engine', 'ejs');
  await app.listen(3001);
}
bootstrap();
