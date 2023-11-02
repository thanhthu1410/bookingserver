import { CreateTimeDto } from './create-time.dto';
declare const UpdateTimeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateTimeDto>>;
export declare class UpdateTimeDto extends UpdateTimeDto_base {
    duration: number;
    startTime: string;
    endTime: string;
    maxDate: number;
    stepMinute: number;
    reminderTime: number;
}
export {};
