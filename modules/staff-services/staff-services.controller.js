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
exports.StaffServicesController = void 0;
const common_1 = require("@nestjs/common");
const staff_services_service_1 = require("./staff-services.service");
const create_staff_service_dto_1 = require("./dto/create-staff-service.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let StaffServicesController = class StaffServicesController {
    staffServicesService;
    constructor(staffServicesService) {
        this.staffServicesService = staffServicesService;
    }
    async create(res, createStaffServiceDto) {
        try {
            let StaffServiceRes = await this.staffServicesService.create(createStaffServiceDto);
            res.statusMessage = StaffServiceRes.message;
            res
                .status(StaffServiceRes.status ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(StaffServiceRes);
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findOne(id, res) {
        try {
            let staffServiceerviceRes = await this.staffServicesService.findOne(id);
            res.statusMessage = staffServiceerviceRes.message;
            res
                .status(staffServiceerviceRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(staffServiceerviceRes.data);
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id, res) {
        try {
            let StaffServiceRes = await this.staffServicesService.remove(id);
            res.statusMessage = StaffServiceRes.message;
            res
                .status(StaffServiceRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(StaffServiceRes);
        }
        catch (err) {
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.StaffServicesController = StaffServicesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_staff_service_dto_1.CreateStaffServiceDto]),
    __metadata("design:returntype", Promise)
], StaffServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StaffServicesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StaffServicesController.prototype, "remove", null);
exports.StaffServicesController = StaffServicesController = __decorate([
    (0, swagger_1.ApiTags)('staff-services'),
    (0, common_1.Controller)('staff-services'),
    __metadata("design:paramtypes", [staff_services_service_1.StaffServicesService])
], StaffServicesController);
//# sourceMappingURL=staff-services.controller.js.map