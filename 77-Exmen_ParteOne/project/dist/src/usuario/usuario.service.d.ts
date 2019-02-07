import { Usuario } from "../app.controller";
import { Repository } from "typeorm";
import { UsuarioEntity } from "./usuario.entity";
export declare class UsuarioService {
    private readonly _usuarioRepository;
    constructor(_usuarioRepository: Repository<UsuarioEntity>);
    autenticarUsuario(correo: string, password: string): Promise<boolean>;
    crearUsuario(usuario: Usuario): void;
    eliminarUsuario(usuarioId: Number): void;
    obtenerRoles(usuarioId: Number): void;
    obtenerUsuarioId(correo: String): void;
}
