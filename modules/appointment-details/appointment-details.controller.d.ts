import { AppointmentDetailsService } from './appointment-details.service';
import { CreateAppointmentDetailDto } from './dto/create-appointment-detail.dto';
import { UpdateAppointmentDetailDto } from './dto/update-appointment-detail.dto';
export declare class AppointmentDetailsController {
    private readonly appointmentDetailsService;
    constructor(appointmentDetailsService: AppointmentDetailsService);
    create(createAppointmentDetailDto: CreateAppointmentDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAppointmentDetailDto: UpdateAppointmentDetailDto): string;
    remove(id: string): string;
}
