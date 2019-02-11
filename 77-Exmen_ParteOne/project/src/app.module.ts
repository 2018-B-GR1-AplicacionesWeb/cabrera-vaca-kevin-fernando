import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsuarioEntity} from "./usuario/usuario.entity";
import {RolEntity} from "./rol/rol.entity";
import {UsuarioModule} from "./usuario/usuario.module";



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'P@ssw0rd',
      database: 'examen',
      synchronize:true,
      dropSchema:false,
      entities : [
        UsuarioEntity,
        RolEntity,
      ]
    }),
      UsuarioModule
  ], //modulos
  controllers: [AppController],
  providers: [AppService], //servicios
})
export class AppModule {}
