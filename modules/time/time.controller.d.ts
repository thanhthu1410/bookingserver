import { TimeService } from './time.service';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { Response } from 'express';
export declare class TimeController {
    private readonly timeService;
    constructor(timeService: TimeService);
    create(createTimeDto: CreateTimeDto): string;
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    update(updateTimeDto: UpdateTimeDto): Promise<{
        status: boolean;
        data: import("./entities/time.entity").Time;
        message: string;
    }>;
}
