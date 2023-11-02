import { CreateStaffServiceDto } from './dto/create-staff-service.dto';
import { StaffService } from './entities/staff-service.entity';
import { Repository } from 'typeorm';
export declare class StaffServicesService {
    private StaffServiceRepository;
    constructor(StaffServiceRepository: Repository<StaffService>);
    create(createStaffServiceDto: CreateStaffServiceDto): Promise<{
        status: boolean;
        message: string;
        data: CreateStaffServiceDto & StaffService;
    }>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data: StaffService;
    }>;
    remove(id: number): Promise<{
        status: boolean;
        message: string;
        data: import("typeorm").DeleteResult;
    }>;
}
