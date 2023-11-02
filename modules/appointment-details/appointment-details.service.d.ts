import { CreateAppointmentDetailDto } from './dto/create-appointment-detail.dto';
import { UpdateAppointmentDetailDto } from './dto/update-appointment-detail.dto';
export declare class AppointmentDetailsService {
    create(createAppointmentDetailDto: CreateAppointmentDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAppointmentDetailDto: UpdateAppointmentDetailDto): string;
    remove(id: number): string;
}
