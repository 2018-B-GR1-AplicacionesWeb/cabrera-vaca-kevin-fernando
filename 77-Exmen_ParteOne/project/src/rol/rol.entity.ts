//rol entity

import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('rol')
export class RolEntity {
    @PrimaryGeneratedColumn()
    idRol : number;

    @Column()
    nombreRol: string;


}
