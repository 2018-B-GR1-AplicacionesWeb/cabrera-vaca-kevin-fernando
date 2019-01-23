import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NoticiaService} from "./noticia/noticia.service";

import {TypeOrmModule} from '@nestjs/typeorm';
import {NoticiaEntity} from "./noticia/noticia-entity";
import {NoticiaModule} from "./noticia/noticia.module";
import {PaginaEntity} from "./pagina/pagina.entity";
import {ArticuloEntity} from "./articulo/articulo.entity";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {UsuarioModule} from "./usuario/usuario.module";

@Module({
    imports: [

        TypeOrmModule.forRoot(
            {
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                database: 'noticias',
                username: 'root',
                password: 'P@ssw0rd',
                synchronize: true,
                dropSchema: false,
                entities: [
                    NoticiaEntity,
                    PaginaEntity,
                    ArticuloEntity,
                    UsuarioEntity
                ]
            }
        ),

        NoticiaModule,
        UsuarioModule
        // app.module.ts
    ],  // MODULOS
    controllers: [
        AppController
    ],  // Controllers
    providers: [
        AppService
    ], // Servicios
})
export class AppModule {
}


// Servidor EJS -> HTML CSS JS -> Pagina web


// PUBLICO
// Servidor Web Estatico -> PDF -> PDF?
// Servidor Web Estatico -> Imagen -> Imagen?


// EXPRESSJS NO NEST










