"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoucherHistoryController = void 0;
const common_1 = require("@nestjs/common");
const voucher_history_service_1 = require("./voucher-history.service");
const create_voucher_history_dto_1 = require("./dto/create-voucher-history.dto");
const update_voucher_history_dto_1 = require("./dto/update-voucher-history.dto");
let VoucherHistoryController = class VoucherHistoryController {
    voucherHistoryService;
    constructor(voucherHistoryService) {
        this.voucherHistoryService = voucherHistoryService;
    }
    create(createVoucherHistoryDto) {
        return this.voucherHistoryService.create(createVoucherHistoryDto);
    }
    findAll() {
        return this.voucherHistoryService.findAll();
    }
    findOne(id) {
        return this.voucherHistoryService.findOne(+id);
    }
    update(id, updateVoucherHistoryDto) {
        return this.voucherHistoryService.update(+id, updateVoucherHistoryDto);
    }
    remove(id) {
        return this.voucherHistoryService.remove(+id);
    }
};
exports.VoucherHistoryController = VoucherHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voucher_history_dto_1.CreateVoucherHistoryDto]),
    __metadata("design:returntype", void 0)
], VoucherHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VoucherHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_voucher_history_dto_1.UpdateVoucherHistoryDto]),
    __metadata("design:returntype", void 0)
], VoucherHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VoucherHistoryController.prototype, "remove", null);
exports.VoucherHistoryController = VoucherHistoryController = __decorate([
    (0, common_1.Controller)('voucher-history'),
    __metadata("design:paramtypes", [voucher_history_service_1.VoucherHistoryService])
], VoucherHistoryController);
//# sourceMappingURL=voucher-history.controller.js.map