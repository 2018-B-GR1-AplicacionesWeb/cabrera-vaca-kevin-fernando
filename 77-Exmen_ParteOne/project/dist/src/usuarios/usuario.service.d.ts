import { Usuario } from "../app.controller";
export declare class UsuarioService {
    crearUsuario(usuario: Usuario): void;
    eliminarUsuario(usuarioId: Number): void;
    obtenerRoles(usuarioId: Number): void;
    obtenerUsuarioId(correo: String): void;
}
