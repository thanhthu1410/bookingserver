"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherHistoryService = void 0;
const common_1 = require("@nestjs/common");
let VoucherHistoryService = class VoucherHistoryService {
    create(createVoucherHistoryDto) {
        return 'This action adds a new voucherHistory';
    }
    findAll() {
        return `This action returns all voucherHistory`;
    }
    findOne(id) {
        return `This action returns a #${id} voucherHistory`;
    }
    update(id, updateVoucherHistoryDto) {
        return `This action updates a #${id} voucherHistory`;
    }
    remove(id) {
        return `This action removes a #${id} voucherHistory`;
    }
};
exports.VoucherHistoryService = VoucherHistoryService;
exports.VoucherHistoryService = VoucherHistoryService = __decorate([
    (0, common_1.Injectable)()
], VoucherHistoryService);
//# sourceMappingURL=voucher-history.service.js.map