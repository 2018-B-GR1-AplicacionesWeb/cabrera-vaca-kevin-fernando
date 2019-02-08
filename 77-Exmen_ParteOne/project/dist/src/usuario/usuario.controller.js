"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const usuario_service_1 = require("./usuario.service");
const typeorm_1 = require("typeorm");
const rol_service_1 = require("../rol/rol.service");
let UsuarioController = class UsuarioController {
    constructor(_usuarioService, _rolService) {
        this._usuarioService = _usuarioService;
        this._rolService = _rolService;
    }
    crearUsuario(response, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._usuarioService.crearUsuario(usuario);
            console.log('Usuario Nuevo', usuario);
            response.redirect('Usuarios');
        });
    }
    Usuarios(res, busqueda, accion, usuarioName, sesion) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Sesion desde Usuarios', sesion);
            var visibleUsuairio = false;
            var visbleAdmin = false;
            if (sesion.roles != undefined) {
                const rolesDelUsuario = sesion.roles;
                const indiceRol = rolesDelUsuario.findIndex((rol) => {
                    return rol.idRol === 2;
                });
                if (indiceRol) {
                    visbleAdmin = true;
                }
            }
            let usuariosct;
            if (busqueda) {
                const consulta = {
                    where: [
                        {
                            nombreUsuario: typeorm_1.Like(`%${busqueda}%`)
                        },
                        {
                            correo: typeorm_1.Like(`%${busqueda}%`)
                        }
                    ]
                };
                usuariosct = yield this._usuarioService.buscarUsuarios(consulta);
            }
            else {
                usuariosct = yield this._usuarioService.buscarUsuarios();
            }
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
            console.log('Mensaje', mensaje);
            console.log('clase', clase);
            res.render('Usuarios', {
                usuarios: usuariosct,
                mensaje: mensaje,
                usuaroView: visibleUsuairio,
                adminView: visbleAdmin
            });
        });
    }
    redireccionar(response) {
        response.render('holaUsuario');
    }
    eliminarUsuario(response, idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioBorrado = yield this._usuarioService
                .eliminarUsuario(Number(idUsuario));
            var mensaje = '?accion=borrar';
            response.redirect('/Usuarios' + mensaje);
        });
    }
    rolePorUsuario(res, idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioFound = yield this._usuarioService.buscarUsuarioPorId(Number(idUsuario));
            const rolesUsuario = yield this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));
            const allRoles = yield this._rolService.buscarRoles();
            console.log();
            res.render('rolesusuarios', {
                usuario: usuarioFound,
                roles: rolesUsuario,
                allroles: allRoles
            });
        });
    }
    eliminarRol(response, idUsuario, idRol) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Usuario', idUsuario);
            console.log('Rol a eliminar', idRol);
            const usuarioFound = yield this._usuarioService.buscarUsuarioPorId(Number(idUsuario));
            const rolesUsuario = yield this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));
            yield this._usuarioService.eliminarRolDeUnUsuario(usuarioFound, Number(idRol), rolesUsuario);
            response.redirect('/Usuarios');
        });
    }
    agregarRol(response, idUsuario, rolNuevo) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioFound = yield this._usuarioService.buscarUsuarioPorId(Number(idUsuario));
            const rolesUsuario = yield this._usuarioService.obtenerRolesDeUnUsuario(Number(idUsuario));
            const allRoles = yield this._rolService.buscarRoles();
            var mensaje = undefined;
            if (!this._usuarioService.agregarRolAUnUsuario(usuarioFound, rolNuevo, rolesUsuario, allRoles)) {
                mensaje = '?accion = error';
            }
            response.redirect('/Usuarios' + mensaje);
        });
    }
};
__decorate([
    common_1.Post('crearUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('Usuarios'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('busqueda')),
    __param(2, common_1.Query('accion')),
    __param(3, common_1.Query('usuarioName')),
    __param(4, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "Usuarios", null);
__decorate([
    common_1.Get('holaUsuario'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "redireccionar", null);
__decorate([
    common_1.Post('eliminarUsuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUsuario", null);
__decorate([
    common_1.Get('RolUsuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "rolePorUsuario", null);
__decorate([
    common_1.Post('eliminarRol/:idUsuario/:idRol'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idUsuario')),
    __param(2, common_1.Param('idRol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarRol", null);
__decorate([
    common_1.Post('agregarRol/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idUsuario')),
    __param(2, common_1.Body('rolNuevo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "agregarRol", null);
UsuarioController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService,
        rol_service_1.RolService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map