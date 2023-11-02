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
exports.AppointmentDetail = void 0;
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const service_entity_1 = require("../../services/entities/service.entity");
const staff_entity_1 = require("../../staffs/entities/staff.entity");
const typeorm_1 = require("typeorm");
let AppointmentDetail = class AppointmentDetail {
    id;
    price;
    slot;
    createdAt;
    updatedAt;
    IsDelete;
    appointmentId;
    appointment;
    serviceId;
    service;
    staffId;
    staff;
};
exports.AppointmentDetail = AppointmentDetail;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1 }),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], AppointmentDetail.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], AppointmentDetail.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], AppointmentDetail.prototype, "IsDelete", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => appointment_entity_1.Appointment, (appointment) => appointment.appointmentDetails),
    (0, typeorm_1.JoinColumn)({ name: "appointmentId" }),
    __metadata("design:type", appointment_entity_1.Appointment)
], AppointmentDetail.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.appointmentDetails),
    (0, typeorm_1.JoinColumn)({ name: "serviceId" }),
    __metadata("design:type", service_entity_1.Service)
], AppointmentDetail.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], AppointmentDetail.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, (staff) => staff.appointmentDetails),
    (0, typeorm_1.JoinColumn)({ name: "staffId" }),
    __metadata("design:type", staff_entity_1.Staff)
], AppointmentDetail.prototype, "staff", void 0);
exports.AppointmentDetail = AppointmentDetail = __decorate([
    (0, typeorm_1.Entity)()
], AppointmentDetail);
//# sourceMappingURL=appointment-detail.entity.js.map