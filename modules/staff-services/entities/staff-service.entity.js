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
exports.StaffService = void 0;
const service_entity_1 = require("../../services/entities/service.entity");
const staff_entity_1 = require("../../staffs/entities/staff.entity");
const typeorm_1 = require("typeorm");
let StaffService = class StaffService {
    id;
    createdAt;
    updatedAt;
    IsDelete;
    serviceId;
    staffId;
    staff;
    service;
};
exports.StaffService = StaffService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], StaffService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: String(Date.now())
    }),
    __metadata("design:type", String)
], StaffService.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: String(Date.now())
    }),
    __metadata("design:type", String)
], StaffService.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], StaffService.prototype, "IsDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], StaffService.prototype, "serviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], StaffService.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => staff_entity_1.Staff, (staff) => staff.staffServices),
    (0, typeorm_1.JoinColumn)({ name: "staffId" }),
    __metadata("design:type", staff_entity_1.Staff)
], StaffService.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_entity_1.Service, (service) => service.staffServices),
    (0, typeorm_1.JoinColumn)({ name: "serviceId" }),
    __metadata("design:type", service_entity_1.Service)
], StaffService.prototype, "service", void 0);
exports.StaffService = StaffService = __decorate([
    (0, typeorm_1.Entity)()
], StaffService);
//# sourceMappingURL=staff-service.entity.js.map