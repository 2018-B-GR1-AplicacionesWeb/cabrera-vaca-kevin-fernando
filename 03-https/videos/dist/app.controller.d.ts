import { AppService } from './app.service';
import { Observable } from "rxjs";
import { Request, Response } from "express";
import { NoticiaService } from "./noticia/noticia.service";
import { UsuarioService } from "./usuario/usuario.service";
export declare class AppController {
    private readonly _appService;
    private readonly _noticiaService;
    private readonly _usuarioService;
    constructor(_appService: AppService, _noticiaService: NoticiaService, _usuarioService: UsuarioService);
    raiz(todosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPOST(response: any): void;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoAsync(): Promise<string>;
    adiosMundoObservable(): Observable<string>;
    crearUsuario(usuario: Usuario, nombre: string, cabeceras: any, codigo: any, res: Response, req: Request | any): void;
    mostrarLogin(res: any): void;
    mostrarLibros(res: any): void;
    ejemploGrilla(res: any): void;
    ejecutarLogin(username: string, password: string, res: any, sesion: any): Promise<void>;
    logout(res: any, sesion: any): void;
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
