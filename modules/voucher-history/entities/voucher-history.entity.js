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
exports.VoucherHistory = void 0;
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const voucher_entity_1 = require("../../vouchers/entities/voucher.entity");
const typeorm_1 = require("typeorm");
let VoucherHistory = class VoucherHistory {
    id;
    appointmentId;
    appointment;
    voucherId;
    voucher;
    customerId;
    createAt;
};
exports.VoucherHistory = VoucherHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VoucherHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VoucherHistory.prototype, "appointmentId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => appointment_entity_1.Appointment),
    (0, typeorm_1.JoinColumn)({ name: "appointmentId" }),
    __metadata("design:type", appointment_entity_1.Appointment)
], VoucherHistory.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], VoucherHistory.prototype, "voucherId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => voucher_entity_1.Voucher),
    (0, typeorm_1.JoinColumn)({ name: 'voucherId' }),
    __metadata("design:type", voucher_entity_1.Voucher)
], VoucherHistory.prototype, "voucher", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: false }),
    __metadata("design:type", Number)
], VoucherHistory.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: Date.now() }),
    __metadata("design:type", String)
], VoucherHistory.prototype, "createAt", void 0);
exports.VoucherHistory = VoucherHistory = __decorate([
    (0, typeorm_1.Entity)()
], VoucherHistory);
//# sourceMappingURL=voucher-history.entity.js.map