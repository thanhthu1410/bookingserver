import { Appointment } from "src/modules/appointments/entities/appointment.entity";
import { Service } from "src/modules/services/entities/service.entity";
import { Staff } from "src/modules/staffs/entities/staff.entity";
export declare class AppointmentDetail {
    id: number;
    price: number;
    slot: number;
    createdAt: string;
    updatedAt: string;
    IsDelete: boolean;
    appointmentId: number;
    appointment: Appointment;
    serviceId: number;
    service: Service;
    staffId: number;
    staff: Staff;
}
