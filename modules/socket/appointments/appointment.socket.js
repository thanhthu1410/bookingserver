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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSocketGateWay = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const appointment_detail_entity_1 = require("../../appointment-details/entities/appointment-detail.entity");
const appointment_service_1 = require("./appointment.service");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const ejs = require("ejs");
const mail_service_1 = require("../../mail/mail.service");
const method_1 = require("../../methods/method");
let AppointmentSocketGateWay = class AppointmentSocketGateWay {
    appointmentService;
    customer;
    appointment;
    appointmentDetail;
    mail;
    server;
    clients = [];
    constructor(appointmentService, customer, appointment, appointmentDetail, mail) {
        this.appointmentService = appointmentService;
        this.customer = customer;
        this.appointment = appointment;
        this.appointmentDetail = appointmentDetail;
        this.mail = mail;
    }
    onModuleInit() {
        this.server.on("connect", (async (socket) => {
            console.log("Da co user connect");
            socket.on("disconnect", () => {
                this.clients = this.clients.filter(client => client.socket.id != socket.id);
            });
            socket.emit("connectStatus", {
                message: "Kết nối Socket thành công",
                status: true,
                socketId: socket.id
            });
            this.clients.push({
                socket,
            });
            let listAppointments = await this.appointmentService.findAll();
            if (listAppointments) {
                socket.emit("listAppointments", listAppointments);
            }
            fs.readFile('notification.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                if (data) {
                    try {
                        let notifications = JSON.parse(data);
                        socket.emit("notifications", notifications);
                    }
                    catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
                }
            });
            socket.on("booking", async (body) => {
                try {
                    let listAppointments = await this.handleBooking(body);
                    if (listAppointments) {
                        for (let i in this.clients) {
                            this.clients[i].socket.emit("listAppointments", listAppointments.data);
                            (0, method_1.saveNotificationToFile)({
                                message: `${listAppointments.newAppointment.customer.fullName} just made an appointment at ${listAppointments.newAppointment.appoiment.date} ${listAppointments.newAppointment.appoiment.time}`
                            })
                                .then((notifications) => {
                                this.clients[i].socket.emit("notifications", notifications);
                                console.log('List of notifications:', notifications);
                            })
                                .catch((error) => {
                                console.error('Error:', error);
                            });
                        }
                        socket.emit("listAppointments", listAppointments.data);
                    }
                    else {
                        socket.emit("bookingFail", {
                            message: "Booking fail"
                        });
                    }
                }
                catch (err) {
                    console.log("err", err);
                }
            });
            socket.on("acceptBooking", async (body) => {
                for (let i in this.clients) {
                    this.clients[i].socket.emit("listAppointments", body);
                }
                socket.emit("listAppointments", body);
            });
            socket.on("acceptNotifications", async (data) => {
                for (let i in this.clients) {
                    (0, method_1.saveNotificationToFile)(data)
                        .then((notifications) => {
                        this.clients[i].socket.emit("notifications", notifications);
                    })
                        .catch((error) => {
                        console.error('Error:', error);
                    });
                }
                socket.emit("notifications", data);
            });
        }));
    }
    async handleBooking(body) {
        try {
            const customerData = {
                fullName: body.customer.fullName,
                email: body.customer.email,
                phoneNumber: body.customer.phoneNumber,
            };
            let totalNotVoucherBefore;
            let totalNotVoucherAfter = totalNotVoucherBefore = body?.details?.reduce((acc, appointment) => {
                const appointmentCost = appointment.price * appointment.slot;
                return acc + appointmentCost;
            }, 0);
            if (!body.voucher) {
                totalNotVoucherBefore = body?.details?.reduce((acc, appointment) => {
                    const appointmentCost = appointment.price * appointment.slot;
                    return acc + appointmentCost;
                }, 0);
            }
            else {
                if (body.voucher.discountType == "cash") {
                    totalNotVoucherBefore = totalNotVoucherAfter - (Number(body?.voucher?.value));
                    console.log("totalNotVoucherBefore", totalNotVoucherBefore);
                    if (totalNotVoucherBefore < 0) {
                        totalNotVoucherBefore = 0;
                    }
                }
                else if (body.voucher.discountType == "percent") {
                    console.log("percent", body.voucher.discountType);
                    totalNotVoucherBefore = totalNotVoucherAfter - (totalNotVoucherAfter * (Number(body?.voucher?.value)) * 0.01);
                }
            }
            const appointmentData = {
                date: body.appointment.date,
                time: body.appointment.time,
                total: body?.voucher ? totalNotVoucherBefore : totalNotVoucherAfter
            };
            const formatAppointmentDetail = body.details;
            let voucherHistoryData;
            if (body?.voucher) {
                console.log("voucher", body?.voucher);
                voucherHistoryData = {
                    voucherId: body?.voucher?.id
                };
            }
            let result = await this.appointmentService.create(customerData, appointmentData, formatAppointmentDetail, voucherHistoryData, body?.voucher);
            console.log("result", result);
            const appointmentDetail = await this.appointmentService.findOne(result.appoiment.id);
            const ejsTemplate = fs.readFileSync('appointmentConfirmed.ejs', 'utf8');
            const templateData = {
                customerName: result.customer.fullName,
                date: result.appoiment.date,
                time: result.appoiment.time,
                id: result.appoiment.id,
                appointmentDetail: appointmentDetail.appointmentDetails,
                total: result.details.reduce((acc, detail) => acc + detail.price, 0),
                voucherValue: (body.voucher) ? ((body.voucher.discountType == "percent") ? (body.voucher.value + "%") : ("$" + body.voucher.value)) : 0,
                apmTotal: result.appoiment.total,
            };
            const compiledHtml = ejs.render(ejsTemplate, templateData);
            this.mail.sendMail({
                to: result.customer.email,
                subject: "Rasm Salon Appointment Confirm",
                html: compiledHtml
            });
            if (result) {
                let listAppointments = await this.appointmentService.findAll();
                return {
                    status: true,
                    data: listAppointments,
                    newAppointment: result
                };
            }
            else {
                return {
                    status: false,
                    message: "Lỗi controller"
                };
            }
        }
        catch {
            return {
                status: false,
                message: "Lỗi controller"
            };
        }
    }
};
exports.AppointmentSocketGateWay = AppointmentSocketGateWay;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppointmentSocketGateWay.prototype, "server", void 0);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppointmentSocketGateWay.prototype, "handleBooking", null);
exports.AppointmentSocketGateWay = AppointmentSocketGateWay = __decorate([
    (0, websockets_1.WebSocketGateway)(3003, { cors: true }),
    __param(1, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(2, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(3, (0, typeorm_1.InjectRepository)(appointment_detail_entity_1.AppointmentDetail)),
    __metadata("design:paramtypes", [appointment_service_1.AppointmentService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        mail_service_1.MailService])
], AppointmentSocketGateWay);
//# sourceMappingURL=appointment.socket.js.map