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
exports.StaffServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const staff_service_entity_1 = require("./entities/staff-service.entity");
const typeorm_2 = require("typeorm");
let StaffServicesService = class StaffServicesService {
    StaffServiceRepository;
    constructor(StaffServiceRepository) {
        this.StaffServiceRepository = StaffServiceRepository;
    }
    async create(createStaffServiceDto) {
        try {
            let service = await this.StaffServiceRepository.save(createStaffServiceDto);
            return {
                status: true,
                message: 'Servicio Creado',
                data: service,
            };
        }
        catch (err) {
            console.log('err', err);
            return {
                status: false,
                message: 'Create fail',
                data: null,
            };
        }
    }
    async findOne(id) {
        try {
            let staffServiceId = await this.StaffServiceRepository.findOne({
                where: { id },
                relations: {
                    staff: true,
                    service: true,
                },
            });
            return {
                status: true,
                message: 'find categoryId success',
                data: staffServiceId,
            };
        }
        catch (err) {
            return {
                status: false,
                message: 'find categoryId success',
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            let staffServiceId = await this.StaffServiceRepository.delete(id);
            return {
                status: true,
                message: 'delete success',
                data: staffServiceId,
            };
        }
        catch (err) {
            return {
                status: true,
                message: 'delete success',
                data: null,
            };
        }
    }
};
exports.StaffServicesService = StaffServicesService;
exports.StaffServicesService = StaffServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_service_entity_1.StaffService)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StaffServicesService);
//# sourceMappingURL=staff-services.service.js.map