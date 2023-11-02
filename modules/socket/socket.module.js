"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("../customers/entities/customer.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const appointment_socket_1 = require("./appointments/appointment.socket");
const appointment_detail_entity_1 = require("../appointment-details/entities/appointment-detail.entity");
const appointment_service_1 = require("./appointments/appointment.service");
const voucher_entity_1 = require("../vouchers/entities/voucher.entity");
const voucher_history_entity_1 = require("../voucher-history/entities/voucher-history.entity");
const mail_service_1 = require("../mail/mail.service");
let SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer, appointment_entity_1.Appointment, appointment_detail_entity_1.AppointmentDetail, voucher_entity_1.Voucher, voucher_history_entity_1.VoucherHistory])
        ],
        providers: [appointment_socket_1.AppointmentSocketGateWay, appointment_service_1.AppointmentService, mail_service_1.MailService]
    })
], SocketModule);
//# sourceMappingURL=socket.module.js.map