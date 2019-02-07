// usuario.controller
import {
    Body,
    Controller, Get, Param, Post, Query, Res
} from '@nestjs/common';
import {Usuario} from "../app.controller";
import {UsuarioService} from "./usuario.service";
import {UsuarioEntity} from './usuario.entity';
import {FindManyOptions, Like} from "typeorm";

@Controller()
export class UsuarioController {

    constructor(
        private readonly _usuarioService : UsuarioService
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

        const usuarioFound = await this._usuarioService.buscarUsuarioPorId(Number(idUsuario))

        const rolesUsuarioFound = await this._usuarioService.obtenerRoles(Number(idUsuario))
        res.render('rolesusuarios',{
            usuario : usuarioFound,
            roles:rolesUsuarioFound
        })
    }

    @Post('eliminarRol/:nombreRol/:correoUsuario')
    eliminarRol(
        @Res() response,
        @Param('nombreRol') nombreRol : string,
        @Param('correoUsuario') correoUsuario : string
    ){
        response.send(nombreRol + correoUsuario );
    }


}