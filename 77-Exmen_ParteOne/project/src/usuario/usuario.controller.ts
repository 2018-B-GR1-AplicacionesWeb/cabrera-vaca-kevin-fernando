// usuario.controller
import {
    Body,
    Controller, Get, Param, Post, Query, Res
} from '@nestjs/common';
import {Usuario} from "../app.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from './usuario.entity';
import {FindManyOptions, Like} from "typeorm";
import {RolService} from "../rol/rol.service";

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
        await this._usuarioService.crearUsuario(usuario);
        console.log('Usuario Nuevo', usuario);
        response.redirect('Usuarios')
    }



    @Get('Usuarios')
    async Usuarios(
        @Res() res,
        @Query('busqueda') busqueda: string,
    )
    {
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


        res.render(
            'Usuarios',
            {
                usuarios: usuariosct
            }
        );
    }



    @Post('eliminarUsuario/:idUsuario')
    async eliminarUsuario(
        @Res() response,
        @Param('idUsuario') idUsuario :string,
    ){
        const  usuarioBorrado = await this._usuarioService
            .eliminarUsuario(Number(idUsuario));

        response.redirect('/Usuarios')
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
        const usuarioFound = await this._usuarioService.buscarUsuarioPorId(Number(idUsuario));
        const rolesUsuario = await this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));
        const allRoles = await this._rolService.buscarRoles();
        var mensaje = '';

        if(!this._usuarioService.agregarRolAUnUsuario(usuarioFound,rolNuevo,rolesUsuario,allRoles)){
             mensaje = 'El usuario ya posee el ROL';
        }

        response.redirect('/Usuarios',{mensajeExtra : mensaje })
    }


}