import { Injectable } from '@nestjs/common';
import {Usuario} from "../../../04 - Libros/videos/dist/app.controller";

@Injectable()
export class AppService {
    bdd : Usuario[] = [];

    crearUsuario(usuario:Usuario){
      this.bdd.push(usuario)
      return this.bdd;
    }
}
