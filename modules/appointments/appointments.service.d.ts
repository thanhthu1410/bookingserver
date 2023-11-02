import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
export declare class AppointmentsService {
    private appointmentRepository;
    private readonly mail;
    constructor(appointmentRepository: Repository<Appointment>, mail: MailService);
    create(createAppointmentDto: CreateAppointmentDto): string;
    findAll(): Promise<{
        status: boolean;
        message: string;
        data: Appointment[];
    }>;
    acceptAppointment(id: number): Promise<string | {
        status: boolean;
        message: string;
        data: Appointment;
    }>;
    update(id: number): Promise<Appointment>;
    remove(id: number): string;
    updateInformation(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<{
        status: boolean;
        data: Appointment;
    }>;
    updateReminderEmail(id: number): Promise<{
        status: boolean;
        message: string;
        data: Appointment;
    }>;
}
