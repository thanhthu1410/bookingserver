import { CreateCronjobDto } from './dto/create-cronjob.dto';
import { UpdateCronjobDto } from './dto/update-cronjob.dto';
import { MailService } from '../mail/mail.service';
import { AppointmentsService } from '../appointments/appointments.service';
import { TimeService } from '../time/time.service';
export declare class CronjobsService {
    private readonly mail;
    private readonly appointmentsService;
    private readonly timeService;
    constructor(mail: MailService, appointmentsService: AppointmentsService, timeService: TimeService);
    private readonly logger;
    handleCron(): Promise<boolean>;
    create(createCronjobDto: CreateCronjobDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCronjobDto: UpdateCronjobDto): string;
    remove(id: number): string;
}
