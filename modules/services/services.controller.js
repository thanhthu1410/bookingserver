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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
const update_service_dto_1 = require("./dto/update-service.dto");
const platform_express_1 = require("@nestjs/platform-express");
const fb_1 = require("../../fb");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
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
let ServicesController = class ServicesController {
    servicesService;
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async create(res, body, file, req) {
        const data = JSON.parse(body.service);
        let avatar = await (0, fb_1.uploadFileToStorage)(file, 'service', file.buffer);
        const newData = {
            ...data,
            avatar: avatar,
        };
        try {
            let serviceRes = await this.servicesService.create(newData);
            res
                .status(serviceRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
        }
        catch (err) {
            console.log('err', err);
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(res, skip, take) {
        try {
            let pagination = {
                skip,
                take,
            };
            let serviceRes = await this.servicesService.findAll(pagination);
            res.statusMessage = serviceRes.message;
            res
                .status(serviceRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
        }
        catch (err) {
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllService(res, q) {
        if (q != undefined) {
            try {
                return res
                    .status(common_1.HttpStatus.OK)
                    .json(await this.servicesService.searchByName(q));
            }
            catch (err) {
                throw new common_1.HttpException('Loi Controller', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        else {
            try {
                let serviceResAll = await this.servicesService.findServie();
                res.statusMessage = serviceResAll.message;
                res
                    .status(serviceResAll.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                    .json(serviceResAll);
            }
            catch (err) {
                throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
            }
        }
    }
    async update(res, req, id, body, updateServiceDto, file) {
        console.log('updatedata');
        try {
            let updateServiceDto;
            if (body.services) {
                updateServiceDto = JSON.parse(body.services);
            }
            if (file) {
                let url = await (0, fb_1.uploadFileToStorage)(file, 'service', file?.buffer);
                updateServiceDto = {
                    ...updateServiceDto,
                    avatar: url,
                };
                let serviceRes = await this.servicesService.update(id, updateServiceDto);
                console.log('serviceRes', serviceRes);
                if (serviceRes) {
                    res.statusMessage = serviceRes.message;
                    res
                        .status(serviceRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                        .json(serviceRes);
                }
            }
            else {
                let serviceRes = await this.servicesService.update(id, updateServiceDto);
                if (serviceRes) {
                    res.statusMessage = serviceRes.message;
                    res
                        .status(serviceRes.data ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                        .json(serviceRes);
                }
            }
        }
        catch (err) {
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id, res) {
        try {
            let serviceRes = await this.servicesService.remove(id);
            res
                .status(serviceRes ? common_1.HttpStatus.OK : common_1.HttpStatus.ACCEPTED)
                .json(serviceRes);
            res.statusMessage = serviceRes.message;
        }
        catch (err) {
            throw new common_1.HttpException('loi controller', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({
        type: ResInterface,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Request]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({
        type: ResInterface,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('skip', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('take', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiResponse)({
        type: ResInterface,
    }),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAllService", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiResponse)({
        type: ResInterface,
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __param(5, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Request, Number, Object, update_service_dto_1.UpdateServiceDto, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({
        type: ResInterface,
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "remove", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)('services'),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map