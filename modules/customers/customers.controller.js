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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const customers_service_1 = require("./customers.service");
const create_customer_dto_1 = require("./dto/create-customer.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    async create(body, createCustomerDto, res) {
        const customerData = {
            fullName: body?.customer?.fullName,
            email: body?.customer?.email,
            phoneNumber: body?.customer?.phoneNumber,
        };
        let totalNotVoucherBefore;
        let totalNotVoucherAfter = (totalNotVoucherBefore = body?.details?.reduce((acc, appointment) => {
            const appointmentCost = appointment.price * appointment.slot;
            return acc + appointmentCost;
        }, 0));
        if (!body.voucher) {
            totalNotVoucherBefore = body?.details?.reduce((acc, appointment) => {
                const appointmentCost = appointment.price * appointment.slot;
                return acc + appointmentCost;
            }, 0);
        }
        else {
            if (body.voucher.discountType == 'cash') {
                totalNotVoucherBefore =
                    totalNotVoucherAfter - Number(body?.voucher?.value);
                console.log('totalNotVoucherBefore', totalNotVoucherBefore);
                if (totalNotVoucherBefore < 0) {
                    totalNotVoucherBefore = 0;
                }
            }
            else if (body.voucher.discountType == 'percent') {
                console.log('percent', body.voucher.discountType);
                totalNotVoucherBefore =
                    totalNotVoucherAfter -
                        totalNotVoucherAfter * Number(body?.voucher?.value) * 0.01;
            }
        }
        const appointmentData = {
            date: body?.appointment?.date,
            time: body?.appointment?.time,
            total: body?.voucher ? totalNotVoucherBefore : totalNotVoucherAfter,
        };
        const formatAppoimentDetail = body?.details;
        let voucherHistoryData;
        if (body?.voucher) {
            console.log('voucher', body?.voucher);
            voucherHistoryData = {
                voucherId: body?.voucher?.id,
            };
        }
        let result = await this.customersService.create(customerData, appointmentData, formatAppoimentDetail, voucherHistoryData, body?.voucher);
        console.log('result', result);
        return res.status(result.status ? 200 : 213).json(result.message);
    }
    async findAll(res, skip, take) {
        try {
            console.log('vao phan trang customer');
            let pagination = {
                skip,
                take,
            };
            let customerRes = await this.customersService.findAll(pagination);
            res.statusMessage = customerRes.message;
            res
                .status(customerRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(customerRes);
        }
        catch (err) {
            console.log('🚀CustomersController ~ err:', err);
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllCustomer(res, q) {
        console.log('search Customer', q);
        if (q != undefined) {
            try {
                console.log("q", q);
                return res.status(common_1.HttpStatus.OK).json(await this.customersService.searchByEmail(q));
            }
            catch (err) {
                throw new common_1.HttpException('Loi Controller', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            try {
                let customerResAll = await this.customersService.findCustomer();
                res.statusMessage = customerResAll.message;
                res
                    .status(customerResAll.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                    .json(customerResAll);
            }
            catch (err) {
                throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_customer_dto_1.CreateCustomerDto, Object]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('skip', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('take', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findAllCustomer", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('customers'),
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [customers_service_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map