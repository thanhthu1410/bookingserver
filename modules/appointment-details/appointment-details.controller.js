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
exports.AppointmentDetailsController = void 0;
const common_1 = require("@nestjs/common");
const appointment_details_service_1 = require("./appointment-details.service");
const create_appointment_detail_dto_1 = require("./dto/create-appointment-detail.dto");
const update_appointment_detail_dto_1 = require("./dto/update-appointment-detail.dto");
let AppointmentDetailsController = class AppointmentDetailsController {
    appointmentDetailsService;
    constructor(appointmentDetailsService) {
        this.appointmentDetailsService = appointmentDetailsService;
    }
    create(createAppointmentDetailDto) {
        return this.appointmentDetailsService.create(createAppointmentDetailDto);
    }
    findAll() {
        return this.appointmentDetailsService.findAll();
    }
    findOne(id) {
        return this.appointmentDetailsService.findOne(+id);
    }
    update(id, updateAppointmentDetailDto) {
        return this.appointmentDetailsService.update(+id, updateAppointmentDetailDto);
    }
    remove(id) {
        return this.appointmentDetailsService.remove(+id);
    }
};
exports.AppointmentDetailsController = AppointmentDetailsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_detail_dto_1.CreateAppointmentDetailDto]),
    __metadata("design:returntype", void 0)
], AppointmentDetailsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppointmentDetailsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentDetailsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_appointment_detail_dto_1.UpdateAppointmentDetailDto]),
    __metadata("design:returntype", void 0)
], AppointmentDetailsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppointmentDetailsController.prototype, "remove", null);
exports.AppointmentDetailsController = AppointmentDetailsController = __decorate([
    (0, common_1.Controller)('appointment-details'),
    __metadata("design:paramtypes", [appointment_details_service_1.AppointmentDetailsService])
], AppointmentDetailsController);
//# sourceMappingURL=appointment-details.controller.js.map