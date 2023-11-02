"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronjobsModule = void 0;
const common_1 = require("@nestjs/common");
const cronjobs_service_1 = require("./cronjobs.service");
const cronjobs_controller_1 = require("./cronjobs.controller");
const mail_service_1 = require("../mail/mail.service");
const appointments_service_1 = require("../appointments/appointments.service");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const time_service_1 = require("../time/time.service");
const time_entity_1 = require("../time/entities/time.entity");
let CronjobsModule = class CronjobsModule {
};
exports.CronjobsModule = CronjobsModule;
exports.CronjobsModule = CronjobsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([appointment_entity_1.Appointment, time_entity_1.Time])],
        controllers: [cronjobs_controller_1.CronjobsController],
        providers: [cronjobs_service_1.CronjobsService, mail_service_1.MailService, appointments_service_1.AppointmentsService, time_service_1.TimeService],
    })
], CronjobsModule);
//# sourceMappingURL=cronjobs.module.js.map