// usuario.controller
import {
    Body,
    Controller, Get, Param, Post, Query, Res, Session
} from '@nestjs/common';
import {Usuario} from "../app.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from './usuario.entity';
import {FindManyOptions, Like} from "typeorm";
import {RolService} from "../rol/rol.service";
import {RolEntity} from "../rol/rol.entity";
import {CreateUsuarioDto} from './dto/create.dto';
import {validate, ValidationError} from "class-validator";

@Controller()
export class UsuarioController {

    constructor(
        private readonly _usuarioService : UsuarioService,
        private readonly _rolService : RolService,
    ){    }




    @Post('crearUsuario')
    async crearUsuario(
        @Res() response,
        @Body() usuario:Usuario
    ){
        const objValUser = new CreateUsuarioDto();

        //const hoy = new Date();

        objValUser.nombre = usuario.nombreUsuario;
        objValUser.correo = usuario.correo;
        objValUser.password = usuario.password;
        objValUser.fecha = usuario.fechaNacimiento;

        const errores: ValidationError[] = await validate(objValUser);
        console.log('Errores en la Validacion:',errores)

        const hayErrores = errores.length >0

        var fechaValida = this._usuarioService.fechaValida(usuario.fechaNacimiento);

        if(hayErrores || !fechaValida ){
            response.render('inicio',{
                mensaje: "Datos no validos"
            })
        }else {
            await this._usuarioService.crearUsuario(usuario);
            console.log('Usuario Nuevo', usuario);
            response.redirect('Usuarios')
        }
    }



    @Get('Usuarios')
    async Usuarios(
        @Res() res,
        @Query('busqueda') busqueda: string,
        @Query('accion') accion: string,
        @Query('usuarioName') usuarioName: string,
        @Session () sesion

    )
    {
        console.log('Sesion desde Usuarios',sesion);
        var visibleUsuairio = false;

        var visbleAdmin= false;

        if (sesion.roles != undefined){
            const rolesDelUsuario : RolEntity[] = sesion.roles
            const indiceRol = rolesDelUsuario.findIndex(
                (rol)=>{
                    return rol.idRol === 2;
                }
            )

            if(indiceRol){
                visbleAdmin = true;
            }
        }

console.log('Es visible para el admin ?',visbleAdmin)


        let usuariosct: UsuarioEntity[];

        if (busqueda) {

            const consulta: FindManyOptions<UsuarioEntity> = {
                where: [
                    {
                        nombreUsuario: Like(`%${busqueda}%`)
                    },
                    {
                        correo: Like(`%${busqueda}%`)
                    }
                ]
            };

            usuariosct = await this._usuarioService.buscarUsuarios(consulta);

        } else {
            usuariosct = await this._usuarioService.buscarUsuarios();
        }


        //const derp = await this._usuarioService.obtenerRoles(5);
        //console.log(derp);

        let mensaje = undefined;
        let clase = undefined;

        if (accion) {
            switch (accion) {
                case 'borrar':
                    mensaje = 'Registro eliminado.';
                    clase = 'alert alert-danger';
                    break;

                case 'actualizar':
                    mensaje = 'Registro actualizado.';
                    clase = 'alert alert-info';
                    break;

                case 'error':
                    mensaje = 'Error';
                    break;
            }
        }

        console.log('Mensaje',mensaje);
        console.log('clase',clase);

        res.render(
            'Usuarios',
            {
                usuarios: usuariosct,
                mensaje : mensaje,
                adminView: visbleAdmin
            }
        );
    }


    @Get('holaUsuario')
    redireccionar(
        @Res() response,
    ){
        response.render('holaUsuario');

    }

    @Post('eliminarUsuario/:idUsuario')
    async eliminarUsuario(
        @Res() response,
        @Param('idUsuario') idUsuario :string,
    ){
        const  usuarioBorrado = await this._usuarioService
            .eliminarUsuario(Number(idUsuario));

        var mensaje = '?accion=borrar'

        response.redirect('/Usuarios'+mensaje);
    }

    @Get('RolUsuario/:idUsuario')
    async rolePorUsuario(
        @Res() res,
        @Param('idUsuario') idUsuario :string,
    ){

        const usuarioFound = await this._usuarioService.buscarUsuarioPorId(Number(idUsuario));

        const rolesUsuario = await this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));

        const allRoles = await  this._rolService.buscarRoles();

        console.log()

        res.render('rolesusuarios',{
            usuario : usuarioFound,
            roles:rolesUsuario,
            allroles: allRoles

        })
    }

    @Post('eliminarRol/:idUsuario/:idRol')
    async eliminarRol(
        @Res() response,
        @Param('idUsuario') idUsuario : string,
        @Param('idRol') idRol : string
    ){
        console.log('Usuario',idUsuario);
        console.log('Rol a eliminar',idRol);

        const usuarioFound = await this._usuarioService.buscarUsuarioPorId(Number(idUsuario));
        const rolesUsuario = await this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));

        await this._usuarioService.eliminarRolDeUnUsuario(usuarioFound,Number(idRol),rolesUsuario);

        response.redirect('/Usuarios')
    }

    @Post('agregarRol/:idUsuario')
    async agregarRol(
        @Res() response,
        @Param('idUsuario') idUsuario : number,
        @Body ('rolNuevo') rolNuevo : number
    ){
        console.log('UsuaioId a agrgar',idUsuario);
        console.log('RolId a agregar',rolNuevo);

        const usuarioFound = await this._usuarioService.buscarUsuarioPorId(Number(idUsuario));
        const rolesUsuario = await this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));

        const allRoles = await this._rolService.buscarRoles();
        var mensaje = undefined;

        await this._usuarioService.agregarRolAUnUsuario(usuarioFound,rolNuevo,rolesUsuario,allRoles);

        response.redirect('/Usuarios');
    }
}