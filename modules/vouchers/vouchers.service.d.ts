import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Voucher } from './entities/voucher.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../services/dto/pagination-service.dto';
export declare class VouchersService {
    private voucherSer;
    constructor(voucherSer: Repository<Voucher>);
    create(data: CreateVoucherDto): Promise<{
        status: boolean;
        message: string;
        data: CreateVoucherDto & Voucher;
    }>;
    findAll(pagination: PaginationDto): Promise<{
        message: string;
        data: Voucher[];
        maxPage: number;
    }>;
    findMany(): Promise<{
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        status: boolean;
        message: string;
        data: Voucher[];
    }>;
    searchByCode(searchString: string): Promise<{
        data: Voucher[];
        message: string;
        massage?: undefined;
    } | {
        massage: string;
        data?: undefined;
        message?: undefined;
    }>;
    getVoucher(searchString: string): Promise<{
        status: boolean;
        data: Voucher;
        message: string;
    } | {
        status: boolean;
        message: string;
        data?: undefined;
    } | {
        data: any;
        message: string;
        status?: undefined;
    }>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data: Voucher;
    }>;
    update(id: number, updateVoucherDto: UpdateVoucherDto): Promise<false | {
        status: boolean;
        message: string;
        data: Voucher;
    }>;
    remove(id: number): string;
}
