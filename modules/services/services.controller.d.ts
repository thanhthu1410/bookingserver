/// <reference types="multer" />
import { ServicesService } from './services.service';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Response } from 'express';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    create(res: Response, body: any, file: Express.Multer.File, req: Request): Promise<void>;
    findAll(res: Response, skip: number, take: number): Promise<void>;
    findAllService(res: Response, q: string): Promise<Response<any, Record<string, any>>>;
    update(res: Response, req: Request, id: number, body: any, updateServiceDto: UpdateServiceDto, file: Express.Multer.File): Promise<void>;
    remove(id: number, res: Response): Promise<void>;
}
