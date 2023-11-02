import { AppointmentDetail } from "src/modules/appointment-details/entities/appointment-detail.entity";
import { StaffService } from "src/modules/staff-services/entities/staff-service.entity";
export declare class Staff {
    id: number;
    name: string;
    avatar: string;
    birthDay: string;
    phoneNumber: string;
    experience: string;
    status: boolean;
    desc: string;
    createdAt: string;
    updatedAt: string;
    IsDelete: boolean;
    appointmentDetails: AppointmentDetail[];
    staffServices: StaffService[];
}
