import {Injectable} from "@nestjs/common";
import {FindManyOptions, Repository} from "typeorm";
import {RolEntity} from "./rol.entity";
import {InjectRepository} from "@nestjs/typeorm"
import {UsuarioEntity} from "../usuario/usuario.entity";

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly _rolRepository: Repository<RolEntity>,

    ) { }

     buscarRoles(parametrosDeBusqueda ? : FindManyOptions<RolEntity>)
        : Promise<RolEntity []>{
        return this._rolRepository.find(parametrosDeBusqueda);
    }

}