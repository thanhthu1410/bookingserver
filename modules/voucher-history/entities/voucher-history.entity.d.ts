import { Appointment } from "src/modules/appointments/entities/appointment.entity";
import { Voucher } from "src/modules/vouchers/entities/voucher.entity";
export declare class VoucherHistory {
    id: number;
    appointmentId: number;
    appointment: Appointment;
    voucherId: number;
    voucher: Voucher;
    customerId: number;
    createAt: string;
}
