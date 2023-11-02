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
exports.StaffsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const staff_entity_1 = require("./entities/staff.entity");
const staff_service_entity_1 = require("../staff-services/entities/staff-service.entity");
let StaffsService = class StaffsService {
    StaffRepository;
    StaffServiceRepository;
    constructor(StaffRepository, StaffServiceRepository) {
        this.StaffRepository = StaffRepository;
        this.StaffServiceRepository = StaffServiceRepository;
    }
    async create(createStaffDto, serviceList) {
        try {
            const newstaff = await this.StaffRepository.save(createStaffDto);
            for (let service of serviceList) {
                await this.StaffServiceRepository.save({
                    staffId: newstaff.id,
                    serviceId: service,
                });
            }
            if (!newstaff) {
                console.log('loi chuwa vao');
                throw new Error('Error');
            }
            return {
                status: true,
                message: 'Servicio Creado',
                data: newstaff,
            };
        }
        catch (err) {
            console.log('err', err);
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(pagination) {
        try {
            let listStaff = await this.StaffRepository.find({
                where: {
                    IsDelete: false,
                    status: true,
                    staffServices: {
                        service: {
                            isDelete: false,
                        },
                    },
                },
                relations: {
                    staffServices: {
                        service: true,
                    },
                },
                skip: pagination.skip,
                take: pagination.take,
            });
            let countItem = (await this.StaffRepository.find()).length;
            let maxPage = Math.ceil(countItem / pagination.take);
            return {
                status: true,
                message: 'successful',
                data: listStaff,
                maxPage,
            };
        }
        catch (err) {
            console.log(' err:', err);
            return {
                status: false,
                message: 'error',
                data: null,
            };
        }
    }
    async findStaff() {
        try {
            let staffList = await this.StaffRepository.find({
                where: {
                    IsDelete: false,
                    status: true,
                    staffServices: {
                        service: {
                            isDelete: false,
                        },
                    },
                },
                relations: {
                    staffServices: {
                        staff: true,
                        service: true,
                    },
                },
            });
            return {
                message: 'successful',
                data: staffList,
            };
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async searchByName(name) {
        try {
            let staff = await this.StaffRepository.find({
                where: {
                    IsDelete: false,
                    name: (0, typeorm_2.ILike)(`%${name}%`),
                },
                relations: {
                    staffServices: {
                        staff: true,
                        service: true,
                    },
                },
            });
            return {
                data: staff,
                message: 'Get service successfully',
            };
        }
        catch (err) {
            console.log('err111111:', err);
            throw new common_1.HttpException('Loi Model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, updateStaffDto) {
        try {
            const data = await this.StaffRepository.findOne({
                where: { id },
                relations: {
                    staffServices: {
                        service: true,
                    },
                },
            });
            if (!data)
                return false;
            let newData = this.StaffRepository.merge(data, updateStaffDto);
            let result = await this.StaffRepository.save(newData);
            return {
                status: true,
                message: 'update successful',
                data: result,
            };
        }
        catch (err) {
            console.log('err service:', err);
            return {
                status: false,
                message: 'Update Faild ',
                data: null,
            };
        }
    }
    async remove(id) {
        try {
            let oldStaff = await this.StaffRepository.findOne({ where: { id } });
            let newstaff = {
                ...oldStaff,
                IsDelete: true,
            };
            const result = this.StaffRepository.merge(oldStaff, newstaff);
            const updateResult = await this.StaffRepository.save(result);
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
};
exports.StaffsService = StaffsService;
exports.StaffsService = StaffsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(staff_entity_1.Staff)),
    __param(1, (0, typeorm_1.InjectRepository)(staff_service_entity_1.StaffService)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StaffsService);
//# sourceMappingURL=staffs.service.js.map