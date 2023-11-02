import { CreateServiceDto } from './create-service.dto';
declare const UpdateServiceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateServiceDto>>;
export declare class UpdateServiceDto extends UpdateServiceDto_base {
    price: number;
    name: string;
    desc: string;
    avatar: string;
    status: boolean;
}
export {};
