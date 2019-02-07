//usuario entity

import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {RolEntity} from "../rol/rol.entity";

@Entity('usuario')
export class UsuarioEntity {
    @PrimaryGeneratedColumn()
    idUsuario : number;

    @Column()
    nombreUsuario: string;

    @Column()
    correo : string;

    @Column()
    password : string;

    @Column()
    fechaNacimiento : Date;

    @ManyToMany(type => RolEntity)
    @JoinTable()
    roles: RolEntity[];

}
