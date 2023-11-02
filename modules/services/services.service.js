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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("./entities/service.entity");
const typeorm_2 = require("typeorm");
const staff_service_entity_1 = require("../staff-services/entities/staff-service.entity");
let ServicesService = class ServicesService {
    serviceRepository;
    StaffServiceRepository;
    constructor(serviceRepository, StaffServiceRepository) {
        this.serviceRepository = serviceRepository;
        this.StaffServiceRepository = StaffServiceRepository;
    }
    async remove(id) {
        try {
            let serviceData = await this.serviceRepository.findOne({ where: { id } });
            let newData = {
                ...serviceData,
                isDelete: true,
            };
            const result = this.serviceRepository.merge(serviceData, newData);
            const updateResult = await this.serviceRepository.save(result);
            if (updateResult) {
                return {
                    status: true,
                    data: updateResult,
                    message: 'Delete ok',
                };
            }
        }
        catch (err) {
            return {
                status: false,
                message: 'Delete Faild ',
                data: null,
            };
        }
    }
    async create(createServiceDto) {
        try {
            let service = await this.serviceRepository.save(createServiceDto);
            if (!service) {
                throw new Error('Error');
            }
            if (!service) {
                throw new common_1.HttpException(`service not found`, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                message: 'Servicio Creado',
                data: service,
            };
        }
        catch (err) {
            console.log('err', err);
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(pagination) {
        try {
            let services = await this.serviceRepository.find({
                where: {
                    isDelete: false,
                },
                relations: {
                    staffServices: {
                        service: true,
                        staff: true,
                    },
                    appointmentDetails: true,
                },
                skip: pagination.skip,
                take: pagination.take,
            });
            let countItem = (await this.serviceRepository.find({
                where: {
                    isDelete: false,
                },
            })).length;
            let maxPage = Math.ceil(countItem / pagination.take);
            return {
                message: 'successful',
                data: services,
                maxPage,
            };
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findServie() {
        try {
            let services = await this.serviceRepository.find({
                where: {
                    isDelete: false,
                    status: true,
                },
                relations: {
                    staffServices: {
                        staff: true,
                    },
                    appointmentDetails: true,
                },
            });
            return {
                message: 'successful',
                data: services,
            };
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateServiceDto) {
        try {
            let data = await this.serviceRepository.findOne({ where: { id } });
            console.log('dataupdate', data);
            if (!data)
                return false;
            let newData = this.serviceRepository.merge(data, updateServiceDto);
            let result = await this.serviceRepository.save(newData);
            console.log('result', result);
            return {
                status: true,
                message: 'Update service Successfully!',
                data: result,
            };
        }
        catch (err) {
            return {
                status: false,
                message: 'Update Faild ',
                data: null,
            };
        }
    }
    async searchByName(name) {
        try {
            let service = await this.serviceRepository.find({
                where: {
                    isDelete: false,
                    name: (0, typeorm_2.ILike)(`%${name}%`),
                },
                relations: {
                    staffServices: true,
                },
            });
            return {
                data: service,
                message: 'Get service successfully',
            };
        }
        catch (err) {
            console.log('err111111:', err);
            throw new common_1.HttpException('Loi Model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(staff_service_entity_1.StaffService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServicesService);
//# sourceMappingURL=services.service.js.map