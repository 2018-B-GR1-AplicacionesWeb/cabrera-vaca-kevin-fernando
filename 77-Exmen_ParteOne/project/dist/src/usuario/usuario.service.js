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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const rol_entity_1 = require("../rol/rol.entity");
let UsuarioService = class UsuarioService {
    constructor(_usuarioRepository, _rolRepository) {
        this._usuarioRepository = _usuarioRepository;
        this._rolRepository = _rolRepository;
    }
    autenticarUsuario(correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = {
                where: {
                    correo: correo,
                    password: password
                }
            };
            const respuesta = yield this._usuarioRepository.findOne(consulta);
            if (respuesta) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    buscarUsuarios(parametrosDeBusqueda) {
        return this._usuarioRepository.find(parametrosDeBusqueda);
    }
    crearUsuario(usuario) {
        const usuarioEntity = this._usuarioRepository.create(usuario);
        return this._usuarioRepository.save(usuarioEntity);
    }
    eliminarUsuario(usuarioId) {
        const usuarioAEliminar = this._usuarioRepository
            .create({
            idUsuario: usuarioId
        });
        return this._usuarioRepository.remove(usuarioAEliminar);
    }
    buscarUsuarioPorId(usuarioId) {
        return this._usuarioRepository.findOne(usuarioId);
    }
    obtenerRoles(usuarioId) {
        return [
            {
                id: 1,
                nombre: 'administrador'
            },
            {
                id: 2,
                nombre: 'usuario'
            }
        ];
    }
    camposValidos(newUsuario) {
        if (!this.correoValido(newUsuario.correo)) {
            return false;
        }
        else if (!this.nombreValido(newUsuario.nombreUsuario)) {
            return false;
        }
        else if (!this.fechaValida(newUsuario.fechaNacimiento)) {
            return false;
        }
        else {
            return true;
        }
    }
    correoValido(valor) {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (valor === '') {
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
    nombreValido(valor) {
        var filter = /^[A-Za-z\_\-\.\s\xF1\xD1]+$/;
        if (valor === '') {
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
    fechaValida(valor) {
        var hoy = new Date();
        if (hoy < valor) {
            return false;
        }
        else {
            return true;
        }
    }
};
UsuarioService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(usuario_entity_1.UsuarioEntity)),
    __param(1, typeorm_1.InjectRepository(rol_entity_1.RolEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsuarioService);
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuario.service.js.map