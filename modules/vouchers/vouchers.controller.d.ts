import { VouchersService } from './vouchers.service';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { Response } from 'express';
export declare class VouchersController {
    private readonly vouchersService;
    constructor(vouchersService: VouchersService);
    create(body: any, createVoucherDto: CreateVoucherDto, res: Response): Promise<false | Response<any, Record<string, any>>>;
    finMany(res: Response, search: string): Promise<Response<any, Record<string, any>>>;
    getVoucher(res: Response, search: string): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, skip: number, take: number): Promise<void>;
    findOne(id: number): Promise<{
        status: boolean;
        message: string;
        data: import("./entities/voucher.entity").Voucher;
    }>;
    update(id: number, updateVoucherDto: UpdateVoucherDto): Promise<false | {
        status: boolean;
        message: string;
        data: import("./entities/voucher.entity").Voucher;
    }>;
    remove(id: string): string;
}
