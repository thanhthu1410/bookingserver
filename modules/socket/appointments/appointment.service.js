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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_detail_entity_1 = require("../../appointment-details/entities/appointment-detail.entity");
const appointment_entity_1 = require("../../appointments/entities/appointment.entity");
const customer_entity_1 = require("../../customers/entities/customer.entity");
const voucher_entity_1 = require("../../vouchers/entities/voucher.entity");
const voucher_history_entity_1 = require("../../voucher-history/entities/voucher-history.entity");
const typeorm_2 = require("typeorm");
let AppointmentService = class AppointmentService {
    customer;
    appointment;
    appointmentDetail;
    voucherHistory;
    voucher;
    constructor(customer, appointment, appointmentDetail, voucherHistory, voucher) {
        this.customer = customer;
        this.appointment = appointment;
        this.appointmentDetail = appointmentDetail;
        this.voucherHistory = voucherHistory;
        this.voucher = voucher;
    }
    async create(createCustomerDto, createAppointmentDto, createAppointmentDetailDto, voucherHistoryDto, useVoucher) {
        try {
            let customerRes;
            const findCustomer = await this.customer.findOne({
                where: {
                    email: createCustomerDto.email,
                },
            });
            if (!findCustomer) {
                customerRes = await this.customer.save(createCustomerDto);
                console.log('customerRes', customerRes);
                if (!customerRes)
                    return {
                        status: false,
                        message: 'Error al crear el cliente',
                    };
                if (customerRes) {
                    let formartAppointment = {
                        ...createAppointmentDto,
                        customerId: customerRes.id,
                        voucherHistoryId: useVoucher ? useVoucher.id : null,
                    };
                    let appointmentRes = await this.appointment.save(formartAppointment);
                    console.log('appointmentRes', appointmentRes);
                    if (!appointmentRes)
                        throw new Error('Error al crear cita');
                    if (appointmentRes) {
                        if (voucherHistoryDto) {
                            console.log('voucherHistoryDto', voucherHistoryDto);
                            const formartVoucherHistory = {
                                ...voucherHistoryDto,
                                appointmentId: Number(appointmentRes.id),
                                customerId: Number(customerRes.id),
                            };
                            let resultVoucherHistory = await this.voucherHistory.save(formartVoucherHistory);
                            console.log('resultVoucherHistory', resultVoucherHistory);
                            if (resultVoucherHistory) {
                                let updateVoucherUsed = {
                                    ...useVoucher,
                                    status: true,
                                };
                                let updatedVoucher = this.voucher.merge(useVoucher, updateVoucherUsed);
                                let resultUpdateVoucher = await this.voucher.save(updatedVoucher);
                            }
                        }
                        for (let i in createAppointmentDetailDto) {
                            createAppointmentDetailDto[i] = {
                                ...createAppointmentDetailDto[i],
                                appointmentId: appointmentRes.id,
                            };
                        }
                        let resultAppomentDetailRes = await Promise.all(createAppointmentDetailDto.map(async (detail) => await this.appointmentDetail.save(detail)));
                        return {
                            status: true,
                            message: 'create booking successfull ',
                            customer: customerRes,
                            appoiment: appointmentRes,
                            details: resultAppomentDetailRes,
                        };
                    }
                }
            }
            else {
                let formartAppointment = {
                    ...createAppointmentDto,
                    customerId: findCustomer.id,
                    voucherHistoryId: useVoucher ? useVoucher.id : null,
                };
                let appointmentRes = await this.appointment.save(formartAppointment);
                if (!appointmentRes)
                    throw new Error('Error al crear cita');
                if (appointmentRes) {
                    if (voucherHistoryDto) {
                        console.log('voucherHistoryDto', voucherHistoryDto);
                        const formartVoucherHistory = {
                            ...voucherHistoryDto,
                            appointmentId: Number(appointmentRes.id),
                            customerId: Number(findCustomer.id),
                        };
                        let resultVoucherHistory = await this.voucherHistory.save(formartVoucherHistory);
                        console.log('resultVoucherHistory', resultVoucherHistory);
                        if (resultVoucherHistory) {
                            let updateVoucherUsed = {
                                ...useVoucher,
                                status: true,
                            };
                            let updatedVoucher = this.voucher.merge(useVoucher, updateVoucherUsed);
                            let resultUpdateVoucher = await this.voucher.save(updatedVoucher);
                        }
                    }
                    for (let i in createAppointmentDetailDto) {
                        createAppointmentDetailDto[i] = {
                            ...createAppointmentDetailDto[i],
                            appointmentId: appointmentRes.id,
                        };
                    }
                    let resultAppomentDetailRes = await Promise.all(createAppointmentDetailDto.map(async (detail) => await this.appointmentDetail.save(detail)));
                    return {
                        status: true,
                        message: 'create booking successfull ',
                        customer: findCustomer,
                        appoiment: appointmentRes,
                        details: resultAppomentDetailRes,
                    };
                }
            }
            return {
                status: true,
                message: 'create booking okey',
            };
        }
        catch (err) {
            console.log('err', err);
            return {
                status: false,
                message: 'Create Appointment Fail',
            };
        }
    }
    async findAll() {
        try {
            let listAppointments = await this.appointment.find({
                relations: {
                    customer: true,
                    appointmentDetails: {
                        staff: true,
                        service: true,
                    },
                },
            });
            return listAppointments;
        }
        catch {
            return {
                status: false,
                data: null,
            };
        }
    }
    async findOne(id) {
        const res = await this.appointment.findOne({
            where: { id: id },
            relations: {
                appointmentDetails: {
                    staff: true,
                    service: true,
                },
                customer: true,
            },
        });
        return res;
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(2, (0, typeorm_1.InjectRepository)(appointment_detail_entity_1.AppointmentDetail)),
    __param(3, (0, typeorm_1.InjectRepository)(voucher_history_entity_1.VoucherHistory)),
    __param(4, (0, typeorm_1.InjectRepository)(voucher_entity_1.Voucher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map