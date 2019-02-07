//Usuario Servicio

import {Injectable} from "@nestjs/common";
import {Usuario} from "../app.controller";
import {InjectRepository} from "@nestjs/typeorm"
import {FindManyOptions, FindOneOptions, Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {RolEntity} from "../rol/rol.entity";

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly _usuarioRepository: Repository<UsuarioEntity>,

        @InjectRepository(RolEntity)
        private readonly _rolRepository:Repository<RolEntity>
    ){ }

    async autenticarUsuario(
        correo : string,
        password: string
    ):Promise <boolean>{

        const consulta:FindOneOptions<UsuarioEntity>={
            where:{
                correo:correo,
                password : password
            }
        };

        const respuesta = await this._usuarioRepository.findOne(consulta);

        if(respuesta){
            return true;
        }else {
            return false;
        }

    }


    buscarUsuarios(parametrosDeBusqueda ? : FindManyOptions<UsuarioEntity>)
    : Promise<UsuarioEntity []>{
        return this._usuarioRepository.find(parametrosDeBusqueda);
    }

    crearUsuario (usuario : Usuario) : Promise<UsuarioEntity>{
    const usuarioEntity : UsuarioEntity = this._usuarioRepository.create(usuario)

        return this._usuarioRepository.save(usuarioEntity)
    }

    eliminarUsuario (usuarioId : number) : Promise <UsuarioEntity>{

        const usuarioAEliminar : UsuarioEntity = this._usuarioRepository
            .create({
                idUsuario : usuarioId
            })


        return this._usuarioRepository.remove(usuarioAEliminar);

    }

    buscarUsuarioPorId(usuarioId: number){
        return this._usuarioRepository.findOne(usuarioId);
    }

    obtenerRoles (usuarioId: Number){
       return  [
            {
                id: 1,
                nombre:'administrador'
            },
            {
                id: 2,
                nombre:'usuario'
            }
        ]
    }


    camposValidos (newUsuario : Usuario) : Boolean {
        if(this.correoValido(newUsuario.correo)){
            return false
        }







    }


    correoValido (valor:string) :boolean {

        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(valor === ''){
            console.log('email incorrecto / vacio');
            return false;
        }


        else if (!filter.test(valor)) {
            console.log('email incorrecto / no valido');
            return false;
        }
        else {
            return true;
        }
    }

    nombreValido (valor:string) : boolean{

        var filter = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;

        if(valor === ''){
            console.log('nombre incorrecto / vacio');
            return false;
        }

        else if (!filter.test(valor)) {
            console.log('nombre incorrecto / no valido');
            return false;
        }
        else {
            return true;
        }

    }


    fechaValida (valor : Date) : boolean {
        var hoy = new Date();

        if (hoy < valor) {
            return false;
        }
        else {
            return true;
        }
    }


}