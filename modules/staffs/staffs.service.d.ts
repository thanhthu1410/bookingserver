import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { StaffService } from '../staff-services/entities/staff-service.entity';
import { PaginationDto } from './dto/pagination-staff.dto';
export declare class StaffsService {
    private StaffRepository;
    private StaffServiceRepository;
    constructor(StaffRepository: Repository<Staff>, StaffServiceRepository: Repository<StaffService>);
    create(createStaffDto: CreateStaffDto, serviceList: Array<number>): Promise<{
        status: boolean;
        message: string;
        data: CreateStaffDto & Staff;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        status: boolean;
        message: string;
        data: Staff[];
        maxPage: number;
    } | {
        status: boolean;
        message: string;
        data: any;
        maxPage?: undefined;
    }>;
    findStaff(): Promise<{
        message: string;
        data: Staff[];
    }>;
    searchByName(name: string): Promise<{
        data: Staff[];
        message: string;
    }>;
    update(id: number, updateStaffDto: UpdateStaffDto): Promise<false | {
        status: boolean;
        message: string;
        data: Staff;
    }>;
    remove(id: number): Promise<{
        status: boolean;
        data: Staff;
        message: string;
    }>;
}
