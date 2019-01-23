"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const noticia_entity_1 = require("./noticia/noticia-entity");
const noticia_module_1 = require("./noticia/noticia.module");
const pagina_entity_1 = require("./pagina/pagina.entity");
const articulo_entity_1 = require("./articulo/articulo.entity");
const usuario_entity_1 = require("./usuario/usuario.entity");
const usuario_module_1 = require("./usuario/usuario.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: '172.29.65.12',
                port: 32769,
                database: 'noticias',
                username: 'andreshcl',
                password: '12345',
                synchronize: true,
                dropSchema: false,
                entities: [
                    noticia_entity_1.NoticiaEntity,
                    pagina_entity_1.PaginaEntity,
                    articulo_entity_1.ArticuloEntity,
                    usuario_entity_1.UsuarioEntity
                ]
            }),
            noticia_module_1.NoticiaModule,
            usuario_module_1.UsuarioModule
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map