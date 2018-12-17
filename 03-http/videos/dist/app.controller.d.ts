import { AppService } from './app.service';
import { Observable } from "rxjs";
import { Request, Response } from "express";
import { NoticiaService } from "./noticia.service";
export declare class AppController {
    private readonly _appService;
    private readonly _noticiaService;
    constructor(_appService: AppService, _noticiaService: NoticiaService);
    raiz(todosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPOST(response: any): void;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoAsync(): Promise<string>;
    adiosMundoObservable(): Observable<string>;
    crearUsuario(usuario: Usuario, nombre: string, cabeceras: any, codigo: any, res: Response, req: Request | any): void;
    inicio(response: any, accion: string, titulo: string): void;
    eliminar(response: any, idNoticia: string): void;
    crearNoticiaRuta(response: any): void;
    crearNoticiaFuncion(response: any, noticia: Noticia): void;
    actualizarNoticiaVista(response: any, idNoticia: string): void;
    actualizarNoticiaMetedo(response: any, idNoticia: string, noticia: Noticia): void;
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
