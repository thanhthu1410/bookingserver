"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentDetailsModule = void 0;
const common_1 = require("@nestjs/common");
const appointment_details_service_1 = require("./appointment-details.service");
const appointment_details_controller_1 = require("./appointment-details.controller");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_detail_entity_1 = require("./entities/appointment-detail.entity");
let AppointmentDetailsModule = class AppointmentDetailsModule {
};
exports.AppointmentDetailsModule = AppointmentDetailsModule;
exports.AppointmentDetailsModule = AppointmentDetailsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([appointment_detail_entity_1.AppointmentDetail])],
        controllers: [appointment_details_controller_1.AppointmentDetailsController],
        providers: [appointment_details_service_1.AppointmentDetailsService],
    })
], AppointmentDetailsModule);
//# sourceMappingURL=appointment-details.module.js.map