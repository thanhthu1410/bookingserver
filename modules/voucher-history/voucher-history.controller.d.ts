import { VoucherHistoryService } from './voucher-history.service';
import { CreateVoucherHistoryDto } from './dto/create-voucher-history.dto';
import { UpdateVoucherHistoryDto } from './dto/update-voucher-history.dto';
export declare class VoucherHistoryController {
    private readonly voucherHistoryService;
    constructor(voucherHistoryService: VoucherHistoryService);
    create(createVoucherHistoryDto: CreateVoucherHistoryDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateVoucherHistoryDto: UpdateVoucherHistoryDto): string;
    remove(id: string): string;
}
