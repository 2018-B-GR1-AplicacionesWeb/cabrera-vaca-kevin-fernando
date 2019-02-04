import {Body, Controller, Get, Param, Post, Headers, HttpCode,Req,Res, UnauthorizedException} from '@nestjs/common';
import { AppService } from './app.service';



@Controller() //Decorador
export class AppController { //Export para poder importarlo en otros archivos
  constructor(private readonly appService: AppService) {}

  @Get() // url  http://ip:puerto/url
  getHello(): string {
    return 'Hol mUNDO cRUEL';
  }

  @Get('segmento/:IdUsuario')
  parametroruta(
      @Param('IdUsuario') id
  )
  {return id}

  @Get('AdiosMundo')
  getAdios():string{
    return 'Die potato Die';
  }

  @Post('crearUsuario')
  crearUsuario(
      @Body() usuario:Usuario ,
      @Body('nombre') nombre :string,
      @Headers() cabeceras,
      @Headers('seguridad') codigoSeguridad:string,
      @Res() res
  ){
    if(codigoSeguridad==='1234'){
      res.append('token','123456789')
      res.send('ok');
    }else{
      throw new UnauthorizedException({
        mensaje: 'Error de Autorizacion',
        error : 401
      })
    }

  }




}

interface Usuario{
nombre : string;
}
