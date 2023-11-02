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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const appointment_detail_entity_1 = require("../../appointment-details/entities/appointment-detail.entity");
const typeorm_1 = require("typeorm");
const staff_service_entity_1 = require("../../staff-services/entities/staff-service.entity");
let Staff = class Staff {
    id;
    name;
    avatar;
    birthDay;
    phoneNumber;
    experience;
    status;
    desc;
    createdAt;
    updatedAt;
    IsDelete;
    appointmentDetails;
    staffServices;
};
exports.Staff = Staff;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Staff.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "birthDay", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "experience", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Staff.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Staff.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], Staff.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], Staff.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Staff.prototype, "IsDelete", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_detail_entity_1.AppointmentDetail, (appointmentDetail) => appointmentDetail.staff),
    __metadata("design:type", Array)
], Staff.prototype, "appointmentDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_service_entity_1.StaffService, (staffService) => staffService.staff),
    __metadata("design:type", Array)
], Staff.prototype, "staffServices", void 0);
exports.Staff = Staff = __decorate([
    (0, typeorm_1.Entity)()
], Staff);
//# sourceMappingURL=staff.entity.js.map