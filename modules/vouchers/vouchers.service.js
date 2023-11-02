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
exports.VouchersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const voucher_entity_1 = require("./entities/voucher.entity");
const typeorm_2 = require("typeorm");
function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
let VouchersService = class VouchersService {
    voucherSer;
    constructor(voucherSer) {
        this.voucherSer = voucherSer;
    }
    async create(data) {
        try {
            let result = await this.voucherSer.save(data);
            return {
                status: true,
                message: "create okey ",
                data: result
            };
        }
        catch {
            return {
                status: false,
                message: "create failed ",
                data: null
            };
        }
    }
    async findAll(pagination) {
        try {
            let services = await this.voucherSer.find({
                where: {
                    IsDelete: false
                },
                skip: pagination.skip,
                take: pagination.take
            });
            let countItem = (await this.voucherSer.find({
                where: {
                    IsDelete: false
                }
            })).length;
            let maxPage = Math.ceil(countItem / pagination.take);
            return {
                message: 'get voucher pagination successful',
                data: services,
                maxPage
            };
        }
        catch (err) {
            throw new common_1.HttpException('loi model', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findMany() {
        let result = await this.voucherSer.find({
            where: {
                IsDelete: false
            }
        });
        if (!result)
            return {
                status: false,
                message: "get faild"
            };
        return {
            status: true,
            message: 'successful get all voucher',
            data: result
        };
    }
    async searchByCode(searchString) {
        try {
            let result = await this.voucherSer.find({
                where: {
                    code: (0, typeorm_2.ILike)(`%${searchString}%`),
                    IsDelete: false
                }
            });
            if (result.length > 0) {
                return {
                    data: result,
                    message: "search voucher okey"
                };
            }
            else {
                return {
                    massage: "invailid voucher"
                };
            }
        }
        catch {
            return {
                data: null,
                message: "search voucher faild"
            };
        }
    }
    async getVoucher(searchString) {
        try {
            let result = await this.voucherSer.findOne({
                where: {
                    code: (0, typeorm_2.ILike)(`${searchString}`),
                    IsDelete: false
                }
            });
            if (result) {
                if (!result.status) {
                    if ((Date.now() - Number(result.startAt)) < 0 || (Date.now() - Number(result.endAt)) > 0) {
                        return {
                            status: false,
                            data: null,
                            message: ` Expiry date of Voucher From : ${formatTimestampToDate(Number(result.startAt))}  - To : ${formatTimestampToDate(Number(result.endAt))} !`
                        };
                    }
                    else {
                        return {
                            status: true,
                            data: result,
                            message: "Add Voucher Successfull !"
                        };
                    }
                }
                else {
                    return {
                        status: false,
                        data: null,
                        message: "Voucher has been used, please try again with another voucher, Thank You !"
                    };
                }
            }
            else {
                return {
                    status: false,
                    message: " Voucher Invalid !"
                };
            }
        }
        catch {
            return {
                data: null,
                message: "search voucher faild"
            };
        }
    }
    async findOne(id) {
        try {
            const result = await this.voucherSer.findOne({
                where: {
                    id,
                }
            });
            if (!result)
                return {
                    status: false,
                    data: null,
                    message: 'Not Found'
                };
            return {
                status: true,
                message: 'get one voucher successfully',
                data: result
            };
        }
        catch {
        }
    }
    async update(id, updateVoucherDto) {
        try {
            const oldData = await this.voucherSer.findOne({
                where: {
                    id
                }
            });
            const resutl = this.voucherSer.merge(oldData, updateVoucherDto);
            const updateData = await this.voucherSer.save(resutl);
            if (!resutl)
                return false;
            return {
                status: true,
                message: "Delete Successfull ",
                data: updateData
            };
        }
        catch {
            return {
                status: false,
                message: "Delete Faild ",
                data: null
            };
        }
    }
    remove(id) {
        return `This action removes a #${id} voucher`;
    }
};
exports.VouchersService = VouchersService;
exports.VouchersService = VouchersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(voucher_entity_1.Voucher)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], VouchersService);
//# sourceMappingURL=vouchers.service.js.map