import { OnModuleInit } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { Customer } from "src/modules/customers/entities/customer.entity";
import { Appointment } from "src/modules/appointments/entities/appointment.entity";
import { AppointmentDetail } from "src/modules/appointment-details/entities/appointment-detail.entity";
import { AppointmentService } from "./appointment.service";
import { Repository } from "typeorm";
import { MailService } from "src/modules/mail/mail.service";
interface ClientType {
    socket: Socket;
}
export declare class AppointmentSocketGateWay implements OnModuleInit {
    private readonly appointmentService;
    private readonly customer;
    private readonly appointment;
    private readonly appointmentDetail;
    private readonly mail;
    server: Server;
    clients: ClientType[];
    constructor(appointmentService: AppointmentService, customer: Repository<Customer>, appointment: Repository<Appointment>, appointmentDetail: Repository<AppointmentDetail>, mail: MailService);
    onModuleInit(): void;
    handleBooking(body: any): Promise<{
        status: boolean;
        data: Appointment[] | {
            status: boolean;
            data: any;
        };
        newAppointment: {
            status: boolean;
            message: string;
            customer?: undefined;
            appoiment?: undefined;
            details?: undefined;
        } | {
            status: boolean;
            message: string;
            customer: any;
            appoiment: any;
            details: (import("../../appointment-details/dto/create-appointment-detail.dto").CreateAppointmentDetailDto & AppointmentDetail)[];
        };
        message?: undefined;
    } | {
        status: boolean;
        message: string;
        data?: undefined;
        newAppointment?: undefined;
    }>;
}
export {};
