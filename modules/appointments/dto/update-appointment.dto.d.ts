import { CreateAppointmentDto } from './create-appointment.dto';
import { AppointmentStatus } from '../appointment.enum';
declare const UpdateAppointmentDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateAppointmentDto>>;
export declare class UpdateAppointmentDto extends UpdateAppointmentDto_base {
    id: number;
    status: AppointmentStatus;
    date: string;
    time: string;
}
export {};
