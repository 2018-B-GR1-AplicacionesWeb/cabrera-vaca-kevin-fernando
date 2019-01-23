"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const noticia_controller_1 = require("./noticia.controller");
const noticia_service_1 = require("./noticia.service");
const typeorm_1 = require("@nestjs/typeorm");
const noticia_entity_1 = require("./noticia-entity");
let NoticiaModule = class NoticiaModule {
};
NoticiaModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule
                .forFeature([
                noticia_entity_1.NoticiaEntity
            ])
        ],
        controllers: [
            noticia_controller_1.NoticiaController
        ],
        providers: [
            noticia_service_1.NoticiaService
        ],
        exports: [
            noticia_service_1.NoticiaService
        ]
    })
], NoticiaModule);
exports.NoticiaModule = NoticiaModule;
//# sourceMappingURL=noticia.module.js.map