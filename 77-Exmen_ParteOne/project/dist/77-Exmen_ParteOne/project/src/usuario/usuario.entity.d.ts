import { RolEntity } from "../rol/rol.entity";
export declare class UsuarioEntity {
    idUsuario: number;
    nombreUsuario: string;
    correo: string;
    password: string;
    fechaNacimiento: Date;
    roles: RolEntity[];
}
