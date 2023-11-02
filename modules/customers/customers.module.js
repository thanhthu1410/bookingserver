"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const customers_controller_1 = require("./customers.controller");
const typeorm_1 = require("@nestjs/typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const appointment_detail_entity_1 = require("../appointment-details/entities/appointment-detail.entity");
const voucher_history_entity_1 = require("../voucher-history/entities/voucher-history.entity");
const voucher_entity_1 = require("../vouchers/entities/voucher.entity");
const config_1 = require("@nestjs/config");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_entity_1.Customer, appointment_entity_1.Appointment, appointment_detail_entity_1.AppointmentDetail, voucher_history_entity_1.VoucherHistory, voucher_entity_1.Voucher]), config_1.ConfigModule],
        controllers: [customers_controller_1.CustomersController],
        providers: [customers_service_1.CustomersService],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map