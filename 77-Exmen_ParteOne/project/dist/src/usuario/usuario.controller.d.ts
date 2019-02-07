import { Usuario } from "../app.controller";
import { UsuarioService } from "./usuario.service";
export declare class UsuarioController {
    private readonly _usuarioService;
    constructor(_usuarioService: UsuarioService);
    crearUsuario(response: any, usuario: Usuario): void;
    Usuarios(res: any): void;
    eliminarUsuario(response: any, idUsuario: string): void;
}
