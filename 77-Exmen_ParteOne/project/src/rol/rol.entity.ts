//rol entity
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('rol')
export class RolEntity {
    @PrimaryGeneratedColumn()
    idRol : number;

    @Column()
    nombreRol: string;
}
