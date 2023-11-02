import { CronjobsService } from './cronjobs.service';
import { CreateCronjobDto } from './dto/create-cronjob.dto';
import { UpdateCronjobDto } from './dto/update-cronjob.dto';
export declare class CronjobsController {
    private readonly cronjobsService;
    constructor(cronjobsService: CronjobsService);
    create(createCronjobDto: CreateCronjobDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCronjobDto: UpdateCronjobDto): string;
    remove(id: string): string;
}
