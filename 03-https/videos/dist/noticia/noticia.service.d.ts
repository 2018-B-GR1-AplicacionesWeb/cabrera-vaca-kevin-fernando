import { Noticia } from "../app.controller";
import { NoticiaEntity } from "./noticia-entity";
import { FindManyOptions, Repository } from "typeorm";
export declare class NoticiaService {
    private readonly _noticiaRepository;
    arreglo: Noticia[];
    numeroRegistro: number;
    constructor(_noticiaRepository: Repository<NoticiaEntity>);
    buscar(parametrosBusqueda?: FindManyOptions<NoticiaEntity>): Promise<NoticiaEntity[]>;
    crear(noticia: Noticia): Promise<NoticiaEntity>;
    eliminar(idNoticia: number): Promise<NoticiaEntity>;
    actualizar(nuevaNoticia: Noticia): Promise<NoticiaEntity>;
    buscarPorId(idNoticia: number): Promise<NoticiaEntity>;
}
