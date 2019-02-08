import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


const http_server = require('http-server');
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as session from 'express-session';
import * as FileSession from 'session-file-store';
import * as express from 'express';

const FileStore = FileSession(session);


//console.log(http_server)

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(
      'ante la duda la mas tetuda',
      {
        //opciones
      }
  ));


    app.set('view engine', 'ejs');
  app.use(
      session({
        secret: 'Ante la duda la mas tetuda',
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false},
        name: 'server-session-id',
        store: new FileStore()
      })
  );

  app.use(express.static('publico'))
  await app.listen(3001);
}
bootstrap();
