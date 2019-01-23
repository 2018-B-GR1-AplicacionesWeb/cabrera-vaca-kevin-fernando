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
const noticia_entity_1 = require("./noticia-entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let NoticiaService = class NoticiaService {
    constructor(_noticiaRepository) {
        this._noticiaRepository = _noticiaRepository;
        this.arreglo = [
            {
                id: 1,
                titulo: 'A',
                descripcion: 'Descripcion de a'
            },
            {
                id: 2,
                titulo: 'B',
                descripcion: 'Descripcion de b '
            },
            {
                id: 3,
                titulo: 'C',
                descripcion: 'Descripcion de c '
            },
            {
                id: 4,
                titulo: 'D',
                descripcion: 'Descripcion de d'
            }
        ];
        this.numeroRegistro = 5;
    }
    buscar(parametrosBusqueda) {
        return this._noticiaRepository.find(parametrosBusqueda);
    }
    crear(noticia) {
        const noticiaEntity = this._noticiaRepository
            .create(noticia);
        return this._noticiaRepository.save(noticiaEntity);
    }
    eliminar(idNoticia) {
        const noticiaAEliminar = this._noticiaRepository
            .create({
            id: idNoticia
        });
        return this._noticiaRepository.remove(noticiaAEliminar);
    }
    actualizar(nuevaNoticia) {
        const noticiaEntity = this._noticiaRepository
            .create(nuevaNoticia);
        return this._noticiaRepository.save(noticiaEntity);
    }
    buscarPorId(idNoticia) {
        return this._noticiaRepository.findOne(idNoticia);
    }
};
NoticiaService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(noticia_entity_1.NoticiaEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], NoticiaService);
exports.NoticiaService = NoticiaService;
//# sourceMappingURL=noticia.service.js.map