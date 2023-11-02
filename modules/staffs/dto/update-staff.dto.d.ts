import { CreateStaffDto } from './create-staff.dto';
declare const UpdateStaffDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateStaffDto>>;
export declare class UpdateStaffDto extends UpdateStaffDto_base {
    name: string;
    birthDay: string;
    phoneNumber: string;
    desc: string;
    avatar: string;
    experience: string;
    status: boolean;
}
export {};
