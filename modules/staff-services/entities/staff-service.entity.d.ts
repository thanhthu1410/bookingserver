import { Service } from "src/modules/services/entities/service.entity";
import { Staff } from "src/modules/staffs/entities/staff.entity";
export declare class StaffService {
    id: number;
    createdAt: string;
    updatedAt: string;
    IsDelete: boolean;
    serviceId: number;
    staffId: number;
    staff: Staff;
    service: Service;
}
