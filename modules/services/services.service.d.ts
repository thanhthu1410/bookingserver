import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination-service.dto';
import { StaffService } from '../staff-services/entities/staff-service.entity';
export declare class ServicesService {
    private serviceRepository;
    private StaffServiceRepository;
    constructor(serviceRepository: Repository<Service>, StaffServiceRepository: Repository<StaffService>);
    remove(id: number): Promise<{
        status: boolean;
        data: Service;
        message: string;
    }>;
    create(createServiceDto: CreateServiceDto): Promise<{
        message: string;
        data: CreateServiceDto & Service;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        message: string;
        data: Service[];
        maxPage: number;
    }>;
    findServie(): Promise<{
        message: string;
        data: Service[];
    }>;
    update(id: number, updateServiceDto: UpdateServiceDto): Promise<false | {
        status: boolean;
        message: string;
        data: Service;
    }>;
    searchByName(name: string): Promise<{
        data: Service[];
        message: string;
    }>;
}
