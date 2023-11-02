import { CreateVoucherDto } from './create-voucher.dto';
declare const UpdateVoucherDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateVoucherDto>>;
export declare class UpdateVoucherDto extends UpdateVoucherDto_base {
    id: number;
    title: string;
    code: string;
    value: number;
    discountType: string;
    IsDelete: boolean;
    status: boolean;
}
export {};
