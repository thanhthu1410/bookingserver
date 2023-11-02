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
exports.Service = void 0;
const appointment_detail_entity_1 = require("../../appointment-details/entities/appointment-detail.entity");
const staff_service_entity_1 = require("../../staff-services/entities/staff-service.entity");
const typeorm_1 = require("typeorm");
let Service = class Service {
    id;
    avatar;
    name;
    desc;
    price;
    status;
    isDelete;
    createAt;
    updateAt;
    appointmentDetails;
    staffServices;
};
exports.Service = Service;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Service.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGYVzWTuDXyCf02RIHia-_X-mnkW_476LQjyc9tZfpOg&s',
    }),
    __metadata("design:type", String)
], Service.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        length: 250,
    }),
    __metadata("design:type", String)
], Service.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Service.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Service.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Service.prototype, "isDelete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: Date.now(),
    }),
    __metadata("design:type", String)
], Service.prototype, "createAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: Date.now(),
    }),
    __metadata("design:type", String)
], Service.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointment_detail_entity_1.AppointmentDetail, (appointmentDetail) => appointmentDetail.service),
    __metadata("design:type", Array)
], Service.prototype, "appointmentDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => staff_service_entity_1.StaffService, (staffService) => staffService.service),
    __metadata("design:type", Array)
], Service.prototype, "staffServices", void 0);
exports.Service = Service = __decorate([
    (0, typeorm_1.Entity)()
], Service);
//# sourceMappingURL=service.entity.js.map