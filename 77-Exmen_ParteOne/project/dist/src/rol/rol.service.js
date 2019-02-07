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
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("./rol.entity");
const typeorm_2 = require("@nestjs/typeorm");
let RolService = class RolService {
    constructor(_rolRepository) {
        this._rolRepository = _rolRepository;
    }
    buscarRoles(parametrosDeBusqueda) {
        return this._rolRepository.find(parametrosDeBusqueda);
    }
};
RolService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(rol_entity_1.RolEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], RolService);
exports.RolService = RolService;
//# sourceMappingURL=rol.service.js.map