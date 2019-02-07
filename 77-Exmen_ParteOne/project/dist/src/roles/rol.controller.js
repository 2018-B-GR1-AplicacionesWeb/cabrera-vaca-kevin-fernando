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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let RolController = class RolController {
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
    common_1.Get('RolUsuario'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "rolusuario", null);
__decorate([
    common_1.Post('eliminarRol/:nombreRol/:correoUsuario'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('nombreRol')),
    __param(2, common_1.Param('correoUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], RolController.prototype, "eliminarRol", null);
RolController = __decorate([
    common_1.Controller()
], RolController);
exports.RolController = RolController;
//# sourceMappingURL=rol.controller.js.map