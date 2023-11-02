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
exports.VouchersController = void 0;
const common_1 = require("@nestjs/common");
const vouchers_service_1 = require("./vouchers.service");
const create_voucher_dto_1 = require("./dto/create-voucher.dto");
const update_voucher_dto_1 = require("./dto/update-voucher.dto");
const swagger_1 = require("@nestjs/swagger");
const auth_guard_1 = require("../auth/auth.guard");
class ResInterface {
    message;
    data;
    status;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ResInterface.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], ResInterface.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], ResInterface.prototype, "status", void 0);
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
let VouchersController = class VouchersController {
    vouchersService;
    constructor(vouchersService) {
        this.vouchersService = vouchersService;
    }
    async create(body, createVoucherDto, res) {
        let arrayVoucher = [];
        for (let i = 0; i < body.quantity; i++) {
            let createVoucher = generateRandomString(6);
            let formatVoucher = {
                code: createVoucher,
                discountType: body.discountType,
                value: body.value,
                title: body.title,
                startAt: body.startAt,
                endAt: body.endAt,
            };
            arrayVoucher.push(formatVoucher);
        }
        let voucherRes = await Promise.all(arrayVoucher.map(async (voucher) => await this.vouchersService.create(voucher)));
        if (!voucherRes)
            return false;
        return res.status(voucherRes ? 200 : 213).json(voucherRes);
    }
    async finMany(res, search) {
        if (search != undefined) {
            try {
                let serviceRes = await this.vouchersService.searchByCode(search);
                res.statusMessage = serviceRes.message;
                return res.status(common_1.HttpStatus.OK).json(serviceRes);
            }
            catch (err) {
                throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            try {
                let serviceRes = await this.vouchersService.findMany();
                res.statusMessage = serviceRes.message;
                return res.status(common_1.HttpStatus.OK).json(serviceRes);
            }
            catch (err) {
                throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getVoucher(res, search) {
        try {
            if (this.getVoucher != undefined) {
                let serviceRes = await this.vouchersService.getVoucher(search);
                res.statusMessage = serviceRes.message;
                return res.status(serviceRes.status ? 200 : 213).json(serviceRes);
            }
        }
        catch (err) {
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(res, skip, take) {
        try {
            let pagination = {
                skip,
                take,
            };
            let voucherRes = await this.vouchersService.findAll(pagination);
            res.statusMessage = voucherRes.message;
            res
                .status(voucherRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(voucherRes);
        }
        catch (err) {
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    findOne(id) {
        return this.vouchersService.findOne(+id);
    }
    update(id, updateVoucherDto) {
        return this.vouchersService.update(id, updateVoucherDto);
    }
    remove(id) {
        return this.vouchersService.remove(+id);
    }
};
exports.VouchersController = VouchersController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({
        schema: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                },
                code: {
                    type: "string",
                },
                value: {
                    type: "number",
                },
                discountType: {
                    type: "string",
                },
                startAt: {
                    type: "string",
                },
                endAt: {
                    type: "string",
                }
            },
            example: {
                title: "Voucher of summer",
                code: "abC3#f",
                value: "10",
                discountType: "percent",
                startAt: "4/11/2023",
                endAt: "10/11/2023"
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        type: ResInterface
    }),
    __param(0, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_voucher_dto_1.CreateVoucherDto, Object]),
    __metadata("design:returntype", Promise)
], VouchersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: ResInterface
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VouchersController.prototype, "finMany", null);
__decorate([
    (0, common_1.Get)('getvoucher'),
    (0, swagger_1.ApiResponse)({
        type: ResInterface
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('getvoucher')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VouchersController.prototype, "getVoucher", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('skip', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('take', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], VouchersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VouchersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_voucher_dto_1.UpdateVoucherDto]),
    __metadata("design:returntype", void 0)
], VouchersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VouchersController.prototype, "remove", null);
exports.VouchersController = VouchersController = __decorate([
    (0, swagger_1.ApiTags)('vouchers'),
    (0, common_1.Controller)('vouchers'),
    __metadata("design:paramtypes", [vouchers_service_1.VouchersService])
], VouchersController);
//# sourceMappingURL=vouchers.controller.js.map