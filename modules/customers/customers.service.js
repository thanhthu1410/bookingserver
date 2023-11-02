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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const appointment_detail_entity_1 = require("../appointment-details/entities/appointment-detail.entity");
const voucher_history_entity_1 = require("../voucher-history/entities/voucher-history.entity");
const voucher_entity_1 = require("../vouchers/entities/voucher.entity");
const appointment_enum_1 = require("../appointments/appointment.enum");
let CustomersService = class CustomersService {
    customersSer;
    appoimentSer;
    appoimentDetailSer;
    voucherHistorySer;
    voucherSer;
    constructor(customersSer, appoimentSer, appoimentDetailSer, voucherHistorySer, voucherSer) {
        this.customersSer = customersSer;
        this.appoimentSer = appoimentSer;
        this.appoimentDetailSer = appoimentDetailSer;
        this.voucherHistorySer = voucherHistorySer;
        this.voucherSer = voucherSer;
    }
    async create(createCustomerDto, createAppointmentDto, createAppointmentDetailDto, voucherHistoryDto, useVoucher) {
        try {
            let customerRes;
            const findCustomer = await this.customersSer.findOne({
                where: {
                    email: createCustomerDto.email,
                },
            });
            if (!findCustomer) {
                customerRes = await this.customersSer.save(createCustomerDto);
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
                    };
                    let appointmentRes = await this.appoimentSer.save(formartAppointment);
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
                            let resultVoucherHistory = await this.voucherHistorySer.save(formartVoucherHistory);
                            console.log('resultVoucherHistory', resultVoucherHistory);
                            if (resultVoucherHistory) {
                                let updateVoucherUsed = {
                                    ...useVoucher,
                                    status: true,
                                };
                                let updatedVoucher = this.voucherSer.merge(useVoucher, updateVoucherUsed);
                                let resultUpdateVoucher = await this.voucherSer.save(updatedVoucher);
                            }
                        }
                        for (let i in createAppointmentDetailDto) {
                            createAppointmentDetailDto[i] = {
                                ...createAppointmentDetailDto[i],
                                appointmentId: appointmentRes.id,
                            };
                        }
                        let resultAppomentDetailRes = await Promise.all(createAppointmentDetailDto.map(async (detail) => await this.appoimentDetailSer.save(detail)));
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
                };
                let appointmentRes = await this.appoimentSer.save(formartAppointment);
                console.log('appointmentRes', appointmentRes);
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
                        let resultVoucherHistory = await this.voucherHistorySer.save(formartVoucherHistory);
                        console.log('resultVoucherHistory', resultVoucherHistory);
                        if (resultVoucherHistory) {
                            let updateVoucherUsed = {
                                ...useVoucher,
                                status: true,
                            };
                            let updatedVoucher = this.voucherSer.merge(useVoucher, updateVoucherUsed);
                            let resultUpdateVoucher = await this.voucherSer.save(updatedVoucher);
                        }
                    }
                    for (let i in createAppointmentDetailDto) {
                        createAppointmentDetailDto[i] = {
                            ...createAppointmentDetailDto[i],
                            appointmentId: appointmentRes.id,
                        };
                    }
                    let resultAppomentDetailRes = await Promise.all(createAppointmentDetailDto.map(async (detail) => await this.appoimentDetailSer.save(detail)));
                    return {
                        status: true,
                        message: 'create booking successfull ',
                        customer: customerRes,
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
                message: 'faild',
            };
        }
    }
    async findAll(pagination) {
        try {
            let listCustomers = await this.customersSer.find({
                where: {
                    appointments: {
                        status: appointment_enum_1.AppointmentStatus.DONE,
                    },
                },
                relations: {
                    appointments: {
                        appointmentDetails: {
                            service: true,
                            staff: true,
                        },
                        voucher: true,
                    },
                },
                skip: pagination.skip,
                take: pagination.take,
            });
            let countItem = (await this.customersSer.find({
                where: {
                    appointments: {
                        status: appointment_enum_1.AppointmentStatus.DONE,
                    },
                },
            })).length;
            let maxPage = Math.ceil(countItem / pagination.take);
            return {
                message: 'successful',
                data: listCustomers,
                maxPage,
            };
        }
        catch (err) {
            console.log('loi model findAll ~ err:', err);
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findCustomer() {
        try {
            let listCustomer = await this.customersSer.find({
                where: {
                    IsDelete: false,
                    appointments: {
                        status: appointment_enum_1.AppointmentStatus.DONE,
                    },
                },
                relations: {
                    appointments: {
                        appointmentDetails: {
                            service: true,
                            staff: true,
                        },
                        voucher: true,
                    },
                },
            });
            return {
                message: 'successful',
                data: listCustomer,
            };
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async searchByEmail(email) {
        try {
            let customer = await this.customersSer.find({
                where: {
                    IsDelete: false,
                    email: (0, typeorm_1.ILike)(`%${email}%`),
                    appointments: {
                        status: appointment_enum_1.AppointmentStatus.DONE,
                    },
                },
                relations: {
                    appointments: {
                        appointmentDetails: {
                            service: true,
                            staff: true,
                        },
                        voucher: true,
                    },
                },
            });
            return {
                data: customer,
                message: 'Get service successfully',
            };
        }
        catch (err) {
            console.log('err111111:', err);
            throw new common_1.HttpException('Loi Model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(customer_entity_1.Customer)),
    __param(1, (0, typeorm_2.InjectRepository)(appointment_entity_1.Appointment)),
    __param(2, (0, typeorm_2.InjectRepository)(appointment_detail_entity_1.AppointmentDetail)),
    __param(3, (0, typeorm_2.InjectRepository)(voucher_history_entity_1.VoucherHistory)),
    __param(4, (0, typeorm_2.InjectRepository)(voucher_entity_1.Voucher)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map