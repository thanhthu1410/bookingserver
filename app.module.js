"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const customers_module_1 = require("./modules/customers/customers.module");
const services_module_1 = require("./modules/services/services.module");
const appointments_module_1 = require("./modules/appointments/appointments.module");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const time_module_1 = require("./modules/time/time.module");
const appointment_details_module_1 = require("./modules/appointment-details/appointment-details.module");
const staffs_module_1 = require("./modules/staffs/staffs.module");
const staff_services_module_1 = require("./modules/staff-services/staff-services.module");
const users_module_1 = require("./modules/users/users.module");
const vouchers_module_1 = require("./modules/vouchers/vouchers.module");
const auth_module_1 = require("./modules/auth/auth.module");
const voucher_history_module_1 = require("./modules/voucher-history/voucher-history.module");
const socket_module_1 = require("./modules/socket/socket.module");
const cronjobs_module_1 = require("./modules/cronjobs/cronjobs.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: process.env.MYSQL_HOST,
                port: Number(process.env.MYSQL_PORT),
                username: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DBNAME,
                entities: ["dist/**/*.entity{.ts,.js}"],
                synchronize: true,
            }),
            socket_module_1.SocketModule,
            customers_module_1.CustomersModule, services_module_1.ServicesModule, appointments_module_1.AppointmentsModule, time_module_1.TimeModule, appointment_details_module_1.AppointmentDetailsModule, staffs_module_1.StaffsModule, staff_services_module_1.StaffServicesModule, users_module_1.UsersModule, vouchers_module_1.VouchersModule, auth_module_1.AuthModule, voucher_history_module_1.VoucherHistoryModule, cronjobs_module_1.CronjobsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map