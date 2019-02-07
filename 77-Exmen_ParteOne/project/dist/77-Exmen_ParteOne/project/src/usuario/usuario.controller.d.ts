import { Usuario } from "../app.controller";
import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private readonly _usuarioService;
    constructor(_usuarioService: UsuarioService);
    crearUsuario(response: any, usuario: Usuario): Promise<void>;
    Usuarios(res: any, busqueda: string): Promise<void>;
    eliminarUsuario(response: any, idUsuario: string): Promise<void>;
    rolusuario(res: any): void;
    eliminarRol(response: any, nombreRol: string, correoUsuario: string): void;
}
