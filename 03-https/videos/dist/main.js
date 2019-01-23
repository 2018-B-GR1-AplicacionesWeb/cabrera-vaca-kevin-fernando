"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileSession = require("session-file-store");
const express = require("express");
const FileStore = FileSession(session);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.use(session({
            secret: 'No sera de tomar un traguito',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false },
            name: 'server-session-id',
            store: new FileStore()
        }));
        app.use(cookieParser('me gustan los tacos', {}));
        app.set('view engine', 'ejs');
        app.use(express.static('publico'));
        yield app.listen(3000);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map