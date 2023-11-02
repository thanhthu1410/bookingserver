import { StaffServicesService } from './staff-services.service';
import { CreateStaffServiceDto } from './dto/create-staff-service.dto';
import { Response } from 'express';
export declare class StaffServicesController {
    private readonly staffServicesService;
    constructor(staffServicesService: StaffServicesService);
    create(res: Response, createStaffServiceDto: CreateStaffServiceDto): Promise<void>;
    findOne(id: number, res: Response): Promise<void>;
    remove(id: number, res: Response): Promise<void>;
}
