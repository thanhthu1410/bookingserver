/// <reference types="multer" />
import { StaffsService } from './staffs.service';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Response } from 'express';
export declare class StaffsController {
    private readonly staffsService;
    constructor(staffsService: StaffsService);
    create(res: Response, body: any, file: Express.Multer.File, req: Request): Promise<void>;
    findAll(res: Response, skip: number, take: number): Promise<void>;
    findAllService(res: Response, q: string): Promise<Response<any, Record<string, any>>>;
    update(res: Response, id: number, body: any, updateStaffDto: UpdateStaffDto, file: Express.Multer.File): Promise<void>;
    remove(id: number, res: Response): Promise<void>;
}
