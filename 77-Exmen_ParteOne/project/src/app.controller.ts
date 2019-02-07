import {Controller, Get, HttpCode, Res, Req, Post, Body, Session, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService,
              private readonly _usuarioService: UsuarioService
              ) {
  }

  @Get('Inicio')
  Login(
      @Res() res,
  ){
    res.render('inicio')
  }


  @Post('login')
  @HttpCode(200)
  async ejecutarLogin(
      @Body('email') correo: string,
      @Body('password') password: string,
      @Res() res,
      @Session() sesion
  ) {

    const respuestas = {
      valido:true,
      nombre: 'Juancho',
      roles: [1,2]
    }


        console.log(sesion);

    if (respuestas.valido) {
      sesion.usuario = respuestas.nombre;
      sesion.roles = respuestas.roles;
      res.send('ok');
    } else {
      res.redirect('Inicio');
    }
  }


  @Get('logout')
  logout(
      @Res() res,
      @Session() sesion
  ) {
    sesion.username = undefined;
    sesion.roles = undefined;
    sesion.destroy();
    res.redirect('Inicio');
  }
}


export interface Usuario {
  idUsuario?: number;
  nombreUsuario: string;
  correo: string;
  password: string;
  fechaNacimiento: string;
}

export interface RespuestaSession {
  valido:boolean;
  nombre?:string;
  roles?: []
}