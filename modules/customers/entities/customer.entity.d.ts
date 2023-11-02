import { Appointment } from "src/modules/appointments/entities/appointment.entity";
export declare class Customer {
    id: number;
    fullName: string;
    phoneNumber: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    IsDelete: boolean;
    status: boolean;
    appointments: Appointment[];
}
