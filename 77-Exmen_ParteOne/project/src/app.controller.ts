import {Controller, Get, HttpCode, Res, Req, Post, Body, Session, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {UsuarioService} from "./usuario/usuario.service";
import {RolEntity} from './rol/rol.entity';

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
      @Body('correolg') correolg: string,
      @Body('passwordlg') passwordlg: string,
      @Res() res,
      @Session() sesion
  ) {
    console.log('correo',correolg);
    console.log('password',passwordlg)
   var respuestas  : RespuestaSession= await this._usuarioService.autenticarUsuario(correolg,passwordlg);
        console.log(respuestas);
    if (respuestas.valido) {
      sesion.usuario = respuestas.nombre;
      sesion.roles = respuestas.roles;
      console.log(sesion)
      console.log(respuestas)

            res.send('OK');

    } else {
      res.redirect('Inicio');
    }
  }

  @Get('Grilla')
  grilla(@Res() res,){
    res.render('grillas');
  }

  @Get('logout')
  logout(
      @Res() res,
      @Session() sesion
  ) {
    sesion.username = undefined;
    sesion.roles = undefined;
    sesion.destroy();
    res.redirect('/Inicio');
  }
}


export interface Usuario {
  idUsuario?: number;
  nombreUsuario: string;
  correo: string;
  password: string;
  fechaNacimiento: Date;
}

export interface RespuestaSession {
  valido:boolean;
  nombre?:string;
  roles?: RolEntity[]
}