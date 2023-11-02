import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { Time } from './entities/time.entity';
import { Repository } from 'typeorm';
export declare class TimeService {
    private timeRepository;
    constructor(timeRepository: Repository<Time>);
    create(createTimeDto: CreateTimeDto): string;
    findAll(): Promise<{
        status: boolean;
        data: Time;
    }>;
    update(updateTimeDto: UpdateTimeDto): Promise<{
        status: boolean;
        data: Time;
        message: string;
    }>;
}
