import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Response } from 'express';
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto): string;
    findAll(): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/appointment.entity").Appointment[];
    }>;
    findOne(id: string, res: Response): Promise<false | Response<any, Record<string, any>>>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<import("./entities/appointment.entity").Appointment>;
    updateInformation(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<{
        status: boolean;
        data: import("./entities/appointment.entity").Appointment;
    }>;
    remove(id: string): string;
}
