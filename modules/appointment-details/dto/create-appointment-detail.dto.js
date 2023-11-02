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
exports.ArrayCreateAppointmentDetailDto = exports.CreateAppointmentDetailDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAppointmentDetailDto {
    appointmentId;
    customerId;
    serviceId;
    staffId;
    price;
    slot;
}
exports.CreateAppointmentDetailDto = CreateAppointmentDetailDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDetailDto.prototype, "appointmentId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDetailDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDetailDto.prototype, "serviceId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDetailDto.prototype, "staffId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDetailDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAppointmentDetailDto.prototype, "slot", void 0);
class ArrayCreateAppointmentDetailDto {
    createAppointmentDetailDto;
}
exports.ArrayCreateAppointmentDetailDto = ArrayCreateAppointmentDetailDto;
//# sourceMappingURL=create-appointment-detail.dto.js.map