import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { Appointment } from '../appointments/entities/appointment.entity';
import { AppointmentDetail } from '../appointment-details/entities/appointment-detail.entity';
import { CreateAppointmentDetailDto } from '../appointment-details/dto/create-appointment-detail.dto';
import { VoucherHistory } from '../voucher-history/entities/voucher-history.entity';
import { CreateVoucherHistoryDto } from '../voucher-history/dto/create-voucher-history.dto';
import { Voucher } from '../vouchers/entities/voucher.entity';
import { PaginationDto } from './dto/pagination-customer.dto';
export declare class CustomersService {
    private customersSer;
    private appoimentSer;
    private appoimentDetailSer;
    private voucherHistorySer;
    private voucherSer;
    constructor(customersSer: Repository<Customer>, appoimentSer: Repository<Appointment>, appoimentDetailSer: Repository<AppointmentDetail>, voucherHistorySer: Repository<VoucherHistory>, voucherSer: Repository<Voucher>);
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
    findAll(pagination: PaginationDto): Promise<{
        message: string;
        data: Customer[];
        maxPage: number;
    }>;
    findCustomer(): Promise<{
        message: string;
        data: Customer[];
    }>;
    searchByEmail(email: string): Promise<{
        data: Customer[];
        message: string;
    }>;
}
