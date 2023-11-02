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
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const appointment_enum_1 = require("../appointment.enum");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const appointment_detail_entity_1 = require("../../appointment-details/entities/appointment-detail.entity");
const voucher_entity_1 = require("../../vouchers/entities/voucher.entity");
let Appointment = class Appointment {
    id;
    date;
    time;
    createdAt;
    updatedAt;
    IsDelete;
    IsReminder;
    reasonDelete;
    total;
    status;
    customerId;
    customer;
    appointmentDetails;
    voucherHistoryId;
    voucher;
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "time", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], Appointment.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "IsDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Appointment.prototype, "IsReminder", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "busy" }),
    __metadata("design:type", String)
], Appointment.prototype, "reasonDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Appointment.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: appointment_enum_1.AppointmentStatus, default: appointment_enum_1.AppointmentStatus.PENDING }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Appointment.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.appointments),
    (0, typeorm_1.JoinColumn)({ name: 'customerId' }),
    __metadata("design:type", customer_entity_1.Customer)
], Appointment.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_detail_entity_1.AppointmentDetail, (appointmentDetail) => appointmentDetail.appointment),
    __metadata("design:type", Array)
], Appointment.prototype, "appointmentDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Appointment.prototype, "voucherHistoryId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => voucher_entity_1.Voucher),
    (0, typeorm_1.JoinColumn)({ name: "voucherHistoryId" }),
    __metadata("design:type", voucher_entity_1.Voucher)
], Appointment.prototype, "voucher", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)()
], Appointment);
//# sourceMappingURL=appointment.entity.js.map