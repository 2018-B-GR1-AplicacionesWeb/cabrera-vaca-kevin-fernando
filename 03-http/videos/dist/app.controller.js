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
var _a, _b, _c;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const rxjs_1 = require("rxjs");
const express_1 = require("express");
const noticia_service_1 = require("./noticia.service");
let AppController = class AppController {
    constructor(_appService, _noticiaService) {
        this._appService = _appService;
        this._noticiaService = _noticiaService;
    }
    raiz(todosQueryParams, nombre) {
        console.log(todosQueryParams);
        return 'Hola Mundo' + nombre;
    }
    parametroRuta(id) {
        return id;
    }
    adiosMundo() {
        return 'Adios mundo';
    }
    adiosMundoPOST(response) {
        response.render('inicio', {
            usuario: 'Adrian',
            arreglo: [],
            booleano: true,
        });
    }
    adiosMundoPromesa() {
        const promesaAdios = () => {
            return new Promise((resolve) => {
                resolve('Adios Mundo');
            });
        };
        return promesaAdios();
    }
    adiosMundoAsync() {
        return __awaiter(this, void 0, void 0, function* () {
            const promesaAdios = () => {
                return new Promise((resolve, reject) => {
                    reject('Adios Mundo');
                });
            };
            try {
                const respuesta = yield promesaAdios();
                return respuesta;
            }
            catch (e) {
                console.error(e);
                throw new common_1.InternalServerErrorException({ mensaje: 'Error servidor' });
            }
        });
    }
    adiosMundoObservable() {
        const respuesta$ = rxjs_1.of('Adios Mundo');
        return respuesta$;
    }
    crearUsuario(usuario, nombre, cabeceras, codigo, res, req) {
        console.log('Cookies', req.cookies);
        console.log('Cookies', req.secret);
        console.log('Cookies Seguras', req.signedCookies);
        console.log(usuario);
        console.log(cabeceras);
        if (codigo === '1234') {
            const bdd = this._appService.crearUsuario(usuario);
            res.append('token', '5678');
            res.cookie("app", "web");
            res.cookie("segura", "secreto", {
                signed: true
            });
            res.json(bdd);
        }
        else {
            throw new common_1.UnauthorizedException({
                mensaje: 'Error de autorizacion',
                error: 401
            });
        }
    }
    inicio(response, accion, titulo) {
        let mensaje = undefined;
        if (accion && titulo) {
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
            }
        }
        response.render('inicio', {
            usuario: 'Adrian',
            arreglo: this._noticiaService.arreglo,
            booleano: false,
            mensaje: mensaje
        });
    }
    eliminar(response, idNoticia) {
        const noticiaBorrada = this._noticiaService
            .eliminar(Number(idNoticia));
        const parametrosConsulta = `?accion=borrar&titulo=${noticiaBorrada.titulo}`;
        response.redirect('/inicio' + parametrosConsulta);
    }
    crearNoticiaRuta(response) {
        response.render('crear-noticia');
    }
    crearNoticiaFuncion(response, noticia) {
        this._noticiaService.crear(noticia);
        response.redirect('/inicio');
    }
    actualizarNoticiaVista(response, idNoticia) {
        const noticiaEncontrada = this._noticiaService
            .buscarPorId(+idNoticia);
        response
            .render('crear-noticia', {
            noticia: noticiaEncontrada
        });
    }
    actualizarNoticiaMetedo(response, idNoticia, noticia) {
        noticia.id = +idNoticia;
        this._noticiaService.actualizar(+idNoticia, noticia);
        response.redirect('/inicio');
    }
};
__decorate([
    common_1.Get(),
    common_1.HttpCode(204),
    __param(0, common_1.Query()),
    __param(1, common_1.Query('nombre')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", String)
], AppController.prototype, "raiz", null);
__decorate([
    common_1.Get('segmentoUno/segmentoDos/:idUsuario'),
    __param(0, common_1.Param('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "parametroRuta", null);
__decorate([
    common_1.Get('adiosMundo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "adiosMundo", null);
__decorate([
    common_1.Post('adiosMundo'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "adiosMundoPOST", null);
__decorate([
    common_1.Get('adiosMundoPromesa'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "adiosMundoPromesa", null);
__decorate([
    common_1.Get('adiosMundoAsync'),
    common_1.HttpCode(201),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "adiosMundoAsync", null);
__decorate([
    common_1.Get('adiosMundoObservable'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], AppController.prototype, "adiosMundoObservable", null);
__decorate([
    common_1.Post('crearUsuario'),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __param(1, common_1.Body('nombre')),
    __param(2, common_1.Headers()),
    __param(3, common_1.Headers('seguridad')),
    __param(4, common_1.Res()),
    __param(5, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object, typeof (_a = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _a : Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearUsuario", null);
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('accion')),
    __param(2, common_1.Query('titulo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    common_1.Post('eliminar/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminar", null);
__decorate([
    common_1.Get('crear-noticia'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearNoticiaRuta", null);
__decorate([
    common_1.Post('crear-noticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearNoticiaFuncion", null);
__decorate([
    common_1.Get('actualizar-noticia/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarNoticiaVista", null);
__decorate([
    common_1.Post('actualizar-noticia/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarNoticiaMetedo", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService, typeof (_c = typeof noticia_service_1.NoticiaService !== "undefined" && noticia_service_1.NoticiaService) === "function" ? _c : Object])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map