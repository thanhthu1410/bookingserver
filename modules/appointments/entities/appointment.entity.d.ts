import { AppointmentStatus } from "../appointment.enum";
import { Customer } from "src/modules/customers/entities/customer.entity";
import { AppointmentDetail } from "src/modules/appointment-details/entities/appointment-detail.entity";
import { Voucher } from "src/modules/vouchers/entities/voucher.entity";
export declare class Appointment {
    id: number;
    date: string;
    time: string;
    createdAt: string;
    updatedAt: string;
    IsDelete: boolean;
    IsReminder: boolean;
    reasonDelete: string;
    total: number;
    status: AppointmentStatus;
    customerId: number;
    customer: Customer;
    appointmentDetails: AppointmentDetail[];
    voucherHistoryId: number;
    voucher: Voucher;
}
