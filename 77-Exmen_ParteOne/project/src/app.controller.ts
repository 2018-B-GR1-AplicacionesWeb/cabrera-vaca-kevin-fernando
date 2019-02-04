import {Controller, Get, HttpCode, Res, Req, Post, Body, Session, Param} from '@nestjs/common';
import { AppService } from './app.service';
import {Request, Response} from "express";
import {options} from "tsconfig-paths/lib/options";
import {get} from "https";

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {
  }

  usuarios= [
      {
        nombre: 'pedor',
        correo: 'casd',
        fecha_nacimiento : 'ayer'
      },
    {
      nombre: 'manco',
      correo: 'casd',
      fecha_nacimiento : 'ayer'
    },
    {
      nombre: 'derp',
      correo: 'casd',
      fecha_nacimiento : 'ayer'
    }

      ]

  @Get()
  getHello(): string {
    return 'All Ok';
  }


  /*
  @Post("Inicio")
  @HttpCode(200)

  crearUsuario(
      @Body() usuario: Usuario,
      @Res() res: Response,
      @Req() req: Request,
  ) {

    const bdd = this._appService.crearUsuario(usuario);
    //creacion de usuario
    res.cookie("app", "WEB");

    res.cookie("segura", "secreto", {
      // secure: true,
      signed: true
    })
    console.log('Cookies', req.cookies);

    console.log('Cookie Firmada', req.signedCookies);

    res.json(bdd);

    //res.send('OK');
  }
  */


  @Get('Inicio')
  Login(
      @Res() res,
  ){
    res.render('inicio')
  }

  @Get('Usuarios')
  Usuarios(
      @Res() res,
  )
  {
    res.render('usuarios',{
      usuarios:this.usuarios
        }

    )
  }

  @Post('eliminar/:idUsuario')
  eliminar(
      @Res() response,
      @Param('idUsuario') idUsuario :string,
  ){
  
  }


  @Post('Inicio')
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
    /*const respuestas = await this._usuarioService
        .autenticar(correo, password);
*/

    //const respuesta =true;
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

  @Get('RolUsuario')
  rolusuario(
      @Res() res,
  ){
      res.render('rolesusuarios',{
        usuario : {
          nombre:'Kevin',
          correo : 'asdas@asdas.com',
          fecha_nacimiento: '05/25/25'
        },
        roles:[
          {
            id: 1,
            nombre:'administrador'
          },
          {
            id: 2,
            nombre:'usuario'
          }
        ]

      })
  }




  @Get('NewRol')
  NuevoRol(): string{
    return 'Se Agrego Nuevo Rol';
  }

}


export interface Usuario {
  usuario_id: number;
  nombre: string;
  correo: string;
  password: string;
  fecha_nacimiento: string;
}

export interface RespuestaSession {
  valido:boolean;
  nombre:string;
  roles: []
}