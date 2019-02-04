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
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(_appService) {
        this._appService = _appService;
        this.usuarios = [
            {
                nombre: 'pedor',
                correo: 'casd',
                fecha_nacimiento: 'ayer'
            },
            {
                nombre: 'manco',
                correo: 'casd',
                fecha_nacimiento: 'ayer'
            },
            {
                nombre: 'derp',
                correo: 'casd',
                fecha_nacimiento: 'ayer'
            }
        ];
    }
    getHello() {
        return 'All Ok';
    }
    Login(res) {
        res.render('inicio');
    }
    Usuarios(res) {
        res.render('usuarios', {
            usuarios: this.usuarios
        });
    }
    eliminar(response, idUsuario) {
    }
    ejecutarLogin(correo, password, res, sesion) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuestas = {
                valido: true,
                nombre: 'Juancho',
                roles: [1, 2]
            };
            console.log(sesion);
            if (respuestas.valido) {
                sesion.usuario = respuestas.nombre;
                sesion.roles = respuestas.roles;
                res.send('ok');
            }
            else {
                res.redirect('Inicio');
            }
        });
    }
    logout(res, sesion) {
        sesion.username = undefined;
        sesion.roles = undefined;
        sesion.destroy();
        res.redirect('Inicio');
    }
    rolusuario(res) {
        res.render('rolesusuarios', {
            usuario: {
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
    NuevoRol() {
        return 'Se Agrego Nuevo Rol';
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    common_1.Get('Inicio'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Login", null);
__decorate([
    common_1.Get('Usuarios'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "Usuarios", null);
__decorate([
    common_1.Post('eliminar/:idUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminar", null);
__decorate([
    common_1.Post('Inicio'),
    common_1.HttpCode(200),
    __param(0, common_1.Body('email')),
    __param(1, common_1.Body('password')),
    __param(2, common_1.Res()),
    __param(3, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "ejecutarLogin", null);
__decorate([
    common_1.Get('logout'),
    __param(0, common_1.Res()),
    __param(1, common_1.Session()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "logout", null);
__decorate([
    common_1.Get('RolUsuario'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "rolusuario", null);
__decorate([
    common_1.Get('NewRol'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "NuevoRol", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map