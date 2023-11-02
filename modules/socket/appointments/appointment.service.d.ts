import { CreateAppointmentDetailDto } from 'src/modules/appointment-details/dto/create-appointment-detail.dto';
import { AppointmentDetail } from 'src/modules/appointment-details/entities/appointment-detail.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { CreateCustomerDto } from 'src/modules/customers/dto/create-customer.dto';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Voucher } from 'src/modules/vouchers/entities/voucher.entity';
import { VoucherHistory } from 'src/modules/voucher-history/entities/voucher-history.entity';
import { CreateVoucherHistoryDto } from 'src/modules/voucher-history/dto/create-voucher-history.dto';
import { Repository } from 'typeorm';
export declare class AppointmentService {
    private customer;
    private appointment;
    private appointmentDetail;
    private voucherHistory;
    private voucher;
    constructor(customer: Repository<Customer>, appointment: Repository<Appointment>, appointmentDetail: Repository<AppointmentDetail>, voucherHistory: Repository<VoucherHistory>, voucher: Repository<Voucher>);
    create(createCustomerDto: CreateCustomerDto, createAppointmentDto: any, createAppointmentDetailDto: CreateAppointmentDetailDto[], voucherHistoryDto?: CreateVoucherHistoryDto, useVoucher?: any): Promise<{
        status: boolean;
        message: string;
        customer?: undefined;
        appoiment?: undefined;
        details?: undefined;
    } | {
        status: boolean;
        message: string;
        customer: any;
        appoiment: any;
        details: (CreateAppointmentDetailDto & AppointmentDetail)[];
    }>;
    findAll(): Promise<Appointment[] | {
        status: boolean;
        data: any;
    }>;
    findOne(id: number): Promise<Appointment>;
}
