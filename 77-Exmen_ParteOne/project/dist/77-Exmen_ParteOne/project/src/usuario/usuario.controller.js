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
let UsuarioController = class UsuarioController {
    constructor(_usuarioService) {
        this._usuarioService = _usuarioService;
    }
    crearUsuario(response, usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._usuarioService.crearUsuario(usuario);
            console.log('Usuario Nuevo', usuario);
            response.redirect('Usuarios');
        });
    }
    Usuarios(res, busqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            let usuarios;
            if (busqueda) {
                const consulta = {
                    where: [
                        {
                            titulo: Like(`%${busqueda}%`)
                        },
                        {
                            descripcion: Like(`%${busqueda}%`)
                        }
                    ]
                };
                noticias = yield this._noticiaService.buscar(consulta);
            }
            else {
                noticias = yield this._noticiaService.buscar();
            }
        });
    }
    eliminarUsuario(response, idUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarioBorrado = yield this._usuarioService
                .eliminarUsuario(Number(idUsuario));
            response.redirect('Usuarios');
        });
    }
    rolusuario(res) {
        res.render('rolesusuarios', {
            usuario: {
                usuarioId: 25,
                nombre: 'Kevin',
                correo: 'asdas@asdas.com',
                fecha_nacimiento: '05/25/25'
            },
            roles: [
                {
                    id: 1,
                    nombre: 'administrador'
                },
                {
                    id: 2,
                    nombre: 'usuario'
                }
            ]
        });
    }
    eliminarRol(response, nombreRol, correoUsuario) {
        response.send(nombreRol + correoUsuario);
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "Usuarios", null);
__decorate([
    common_1.Post('eliminarUsuario/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "eliminarUsuario", null);
__decorate([
    common_1.Get('RolUsuario'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "rolusuario", null);
__decorate([
    common_1.Post('eliminarRol/:nombreRol/:correoUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('nombreRol')),
    __param(2, common_1.Param('correoUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], UsuarioController.prototype, "eliminarRol", null);
UsuarioController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [usuario_service_1.UsuarioService])
], UsuarioController);
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuario.controller.js.map