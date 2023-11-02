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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const typeorm_2 = require("typeorm");
const appointment_enum_1 = require("./appointment.enum");
const fs = require("fs");
const ejs = require("ejs");
const pdf = require("html-pdf");
const mail_service_1 = require("../mail/mail.service");
const method_1 = require("../createPdf/method");
let AppointmentsService = class AppointmentsService {
    appointmentRepository;
    mail;
    constructor(appointmentRepository, mail) {
        this.appointmentRepository = appointmentRepository;
        this.mail = mail;
    }
    create(createAppointmentDto) {
        return 'This action adds a new appointment';
    }
    async findAll() {
        const res = await this.appointmentRepository.find({
            relations: {
                appointmentDetails: {
                    staff: true,
                    service: true,
                },
                customer: true,
            },
        });
        if (!res)
            return {
                status: false,
                message: 'get fail ',
                data: null,
            };
        return {
            status: true,
            message: 'accept successfull ! ',
            data: res,
        };
    }
    async acceptAppointment(id) {
        const res = await this.appointmentRepository.findOne({
            where: { id: id },
            relations: {
                appointmentDetails: {
                    staff: true,
                    service: true,
                },
                customer: true,
            },
        });
        if (res.status != appointment_enum_1.AppointmentStatus.PENDING) {
            return await ejs.renderFile('acceptedConfirm.ejs');
        }
        const resUpdate = this.appointmentRepository.merge(res, {
            status: appointment_enum_1.AppointmentStatus.ACCEPTED,
        });
        const resResult = await this.appointmentRepository.save(resUpdate);
        console.log('resResult', resResult);
        if (!resResult)
            return {
                status: false,
                message: 'Failed to accept',
                data: null,
            };
        return {
            status: true,
            message: 'accept successfull ! ',
            data: resResult,
        };
    }
    async update(id) {
        const res = await this.appointmentRepository.findOne({
            where: { id: id },
            relations: {
                appointmentDetails: {
                    staff: true,
                    service: true,
                },
                customer: true,
            },
        });
        const resUpdate = this.appointmentRepository.merge(res, {
            status: appointment_enum_1.AppointmentStatus.DONE,
        });
        const resResult = await this.appointmentRepository.save(resUpdate);
        var data = {
            customerName: resResult.customer.fullName,
            date: resResult.date,
            time: resResult.time,
            appointmentDetail: resResult.appointmentDetails,
            total: resResult.appointmentDetails.reduce((acc, detail) => acc + detail.price, 0),
        };
        var ejsTemplate = fs.readFileSync('./pdf.ejs', 'utf8');
        var html = ejs.render(ejsTemplate, data);
        var options = { format: 'Letter' };
        await pdf
            .create(html, options)
            .toFile('./businesscard.pdf', function (err, res) {
            if (err)
                return console.log(err);
            console.log(res);
        });
        this.mail.sendMail({
            to: resResult.customer.email,
            subject: 'aaa',
            html: `
      Testing Pdf Generate document, Thanks.`,
            attachments: [
                {
                    filename: 'businesscard.pdf',
                    contentType: 'application/pdf',
                    path: './businesscard.pdf',
                },
            ],
        });
        return resResult;
    }
    remove(id) {
        return `This action removes a #${id} appointment`;
    }
    async updateInformation(id, updateAppointmentDto) {
        console.log('da vao appoint service');
        try {
            const appointment = await this.appointmentRepository.findOne({
                where: {
                    id,
                },
                relations: {
                    appointmentDetails: {
                        service: true,
                        staff: true,
                    },
                    customer: true,
                    voucher: true,
                },
            });
            console.log('appointment', appointment);
            console.log('updateAppointmentDto', updateAppointmentDto);
            const updatedAppointment = this.appointmentRepository.merge(appointment, updateAppointmentDto);
            const result = await this.appointmentRepository.save(updatedAppointment);
            if (result && result.status === 'DONE') {
                var data = {
                    customerName: result.customer.fullName,
                    date: result.date,
                    time: result.time,
                    appointmentDetail: result.appointmentDetails,
                    total: result.appointmentDetails.reduce((acc, detail) => acc + detail.price, 0),
                    voucherValue: result.voucher
                        ? result.voucher.discountType === 'percent'
                            ? result.voucher.value + '%'
                            : '$' + result.voucher.value
                        : 0,
                    apmTotal: result.total,
                };
                await (0, method_1.createPDF)(data);
                this.mail.sendMail({
                    to: result.customer.email,
                    subject: 'Your Receipt - Rasm Salon',
                    html: `Thanks For Your Appointment.`,
                    attachments: [
                        {
                            filename: 'yourReceipt.pdf',
                            contentType: 'application/pdf',
                            path: './yourReceipt.pdf',
                        },
                    ],
                });
            }
            return {
                status: true,
                data: result,
            };
        }
        catch (error) {
            console.error(error);
            return {
                status: false,
                data: null,
            };
        }
    }
    async updateReminderEmail(id) {
        const oldData = await this.appointmentRepository.findOne({
            where: {
                id,
            },
        });
        if (!oldData)
            return {
                status: false,
                message: 'get appointment update faid',
                data: null,
            };
        const newData = {
            ...oldData,
            IsReminder: true,
        };
        const mergeData = this.appointmentRepository.merge(oldData, newData);
        const resultMergeData = await this.appointmentRepository.save(mergeData);
        if (!resultMergeData)
            return {
                status: false,
                message: 'get appointment update failed',
                data: null,
            };
        return {
            status: true,
            message: 'get appointment update successfull',
            data: resultMergeData,
        };
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map