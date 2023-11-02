import { CreateVoucherHistoryDto } from './dto/create-voucher-history.dto';
import { UpdateVoucherHistoryDto } from './dto/update-voucher-history.dto';
export declare class VoucherHistoryService {
    create(createVoucherHistoryDto: CreateVoucherHistoryDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVoucherHistoryDto: UpdateVoucherHistoryDto): string;
    remove(id: number): string;
}
