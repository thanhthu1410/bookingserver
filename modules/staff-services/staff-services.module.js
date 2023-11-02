"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffServicesModule = void 0;
const common_1 = require("@nestjs/common");
const staff_services_service_1 = require("./staff-services.service");
const staff_services_controller_1 = require("./staff-services.controller");
const typeorm_1 = require("@nestjs/typeorm");
const staff_service_entity_1 = require("./entities/staff-service.entity");
const config_1 = require("@nestjs/config");
let StaffServicesModule = class StaffServicesModule {
};
exports.StaffServicesModule = StaffServicesModule;
exports.StaffServicesModule = StaffServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([staff_service_entity_1.StaffService]), config_1.ConfigModule],
        controllers: [staff_services_controller_1.StaffServicesController],
        providers: [staff_services_service_1.StaffServicesService],
    })
], StaffServicesModule);
//# sourceMappingURL=staff-services.module.js.map