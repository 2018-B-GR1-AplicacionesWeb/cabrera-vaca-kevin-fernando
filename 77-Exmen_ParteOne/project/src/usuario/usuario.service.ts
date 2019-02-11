//Usuario Servicio

import {Injectable} from "@nestjs/common";
import {RespuestaSession, Usuario} from "../app.controller";
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
        private readonly _rolRepository:Repository<RolEntity>,

    ){ }

    async autenticarUsuario (
        correo : string,
        password: string
    ):Promise <RespuestaSession>{

        const consulta:FindOneOptions<UsuarioEntity>={
            where:{
                correo:correo,
                password : password
            }
        };

        const resultadoConsulta = await this._usuarioRepository.findOne(consulta);

        console.log ('Usuario encontrado : ', resultadoConsulta);

        if(resultadoConsulta){


            const roles = await this.obtenerRolesDeUnUsuario(resultadoConsulta.idUsuario);




            var respuestabuena : RespuestaSession={
                valido :true,
                nombre :resultadoConsulta.nombreUsuario,
                roles :roles,
            }



            return respuestabuena;

        }else {
            var respuestamala :RespuestaSession={
                valido :false,
                nombre :'',
                roles :null,
            }

            return respuestamala;
        }


    }



    buscarUsuarios(parametrosDeBusqueda ? : FindManyOptions<UsuarioEntity>)
        : Promise<UsuarioEntity []>{
        return this._usuarioRepository.find(parametrosDeBusqueda);
    }

    crearUsuario (usuario : Usuario) : Promise<UsuarioEntity>{

        if(!this.camposValidos(usuario)){
            return
        }
        else {
            const usuarioEntity: UsuarioEntity = this._usuarioRepository.create(usuario)
            return this._usuarioRepository.save(usuarioEntity)
        }
    }

    eliminarUsuario (usuarioId : number) : Promise <UsuarioEntity>{

        const usuarioAEliminar : UsuarioEntity = this._usuarioRepository
            .create({
                idUsuario : usuarioId
            })
        return this._usuarioRepository.remove(usuarioAEliminar);

    }

    buscarUsuarioPorId(usuarioId: number):Promise<UsuarioEntity>{
        return this._usuarioRepository.findOne(usuarioId);
    }

    async obtenerRolesDeUnUsuario (usuarioId: Number) : Promise<RolEntity[]>{
        const usuriosMasRoles =   await this._usuarioRepository.find({ relations: ["roles"] });
        var roles = [];

        usuriosMasRoles.forEach( (usuario) => {
                if(usuario.idUsuario === usuarioId ){
                    roles = usuario.roles
                }
            }
        )
        return roles;
    }


    camposValidos (newUsuario : Usuario) : Boolean {
        if(!this.correoValido(newUsuario.correo)){
            return false;
        }

        else if(!this.nombreValido(newUsuario.nombreUsuario)){
            return false;
        }

        else if(!this.fechaValida(newUsuario.fechaNacimiento)){
            return false;
        }

        else {return true;}
    }

    eliminarRolDeUnUsuario(usuario : Usuario , rolABorrarID : number,rolesDelUsuario :RolEntity[]) : Promise<UsuarioEntity>  {
       // var valor = 0;
        const indiceRol = rolesDelUsuario.findIndex(
            (rol)=>{
                //valor = valor+1;
                return rol.idRol === +rolABorrarID
            }
        )

        console.log("Supuesto ID que me viene para busacar y eliminar",rolABorrarID)
        console.log('Antiguos Roles',rolesDelUsuario);
        console.log("Numero del Indice del Rol a Eliminar",indiceRol);
        rolesDelUsuario.splice(indiceRol,1);

        const usuarioEntity : UsuarioEntity = this._usuarioRepository.create({
            idUsuario : usuario.idUsuario,
            nombreUsuario : usuario.nombreUsuario,
            correo: usuario.correo,
            password : usuario.password,
            fechaNacimiento : usuario.fechaNacimiento,
            roles: rolesDelUsuario
        })
        return this._usuarioRepository.save(usuarioEntity);
    }

    async agregarRolAUnUsuario (usuario : Usuario , rolAAgregarID : number, rolesDelUsuario : RolEntity[] ,allRoles : RolEntity[]) {
/*
        const yaExiste = rolesDelUsuario.findIndex(
            (rol)=>{
                if( rol.idRol === rolAAgregarID){
                    return true;
                }
            }
        )

        if(yaExiste){
            return null;
        }
*/
        console.log("rolAAgregarId", rolAAgregarID);
        console.log("Allroles",allRoles);


        var newRolAAgregar : RolEntity = allRoles.find(
            (rol) => {
                console.log('rol',rol);
                console.log('rol',rolAAgregarID);
                if(rol.idRol === +rolAAgregarID){
                    console.log("Rol Encontrado en All",rol)
                    return true;
                }else{
                    return false;
                }
            }
        )

        console.log("Nuevo Rol a Agregar",newRolAAgregar);

        var newRoles : RolEntity[] = rolesDelUsuario;
        newRoles.push(newRolAAgregar);

        console.log("Nuevos roles",newRoles);

        const usuarioEntity : UsuarioEntity = this._usuarioRepository.create({
            idUsuario : usuario.idUsuario,
            nombreUsuario : usuario.nombreUsuario,
            correo: usuario.correo,
            password : usuario.password,
            fechaNacimiento : usuario.fechaNacimiento,
            roles: newRoles
        });

        console.log("Usuario con un nuevo rol",usuarioEntity);

        return this._usuarioRepository.save(usuarioEntity);
    }


    correoValido (valor:string) :boolean {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if(valor === ''){
            console.log('email incorrecto / vacio');
            return false;
        }

//if(!re.exec(valor)){
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
        else {return true;}
    }


    fechaValida (valor : Date) : boolean {
        var hoy = new Date();



        if (hoy < valor) {return false;}
        else {return true;}
    }


}