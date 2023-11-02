import { AppointmentDetail } from 'src/modules/appointment-details/entities/appointment-detail.entity';
import { StaffService } from 'src/modules/staff-services/entities/staff-service.entity';
export declare class Service {
    id: number;
    avatar: string;
    name: string;
    desc: string;
    price: number;
    status: boolean;
    isDelete: boolean;
    createAt: string;
    updateAt: string;
    appointmentDetails: AppointmentDetail[];
    staffServices: StaffService[];
}
