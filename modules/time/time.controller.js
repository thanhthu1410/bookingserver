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
exports.TimeController = void 0;
const common_1 = require("@nestjs/common");
const time_service_1 = require("./time.service");
const create_time_dto_1 = require("./dto/create-time.dto");
const update_time_dto_1 = require("./dto/update-time.dto");
const auth_guard_1 = require("../auth/auth.guard");
const swagger_1 = require("@nestjs/swagger");
let TimeController = class TimeController {
    timeService;
    constructor(timeService) {
        this.timeService = timeService;
    }
    create(createTimeDto) {
        return this.timeService.create(createTimeDto);
    }
    async findAll(res) {
        try {
            let serviceRes = await this.timeService.findAll();
            return res
                .status(serviceRes.status ? common_1.HttpStatus.OK : common_1.HttpStatus.BAD_REQUEST)
                .json(serviceRes);
        }
        catch {
            throw new common_1.HttpException('ControllerErr', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    update(updateTimeDto) {
        return this.timeService.update(updateTimeDto);
    }
};
exports.TimeController = TimeController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_time_dto_1.CreateTimeDto]),
    __metadata("design:returntype", void 0)
], TimeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TimeController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_time_dto_1.UpdateTimeDto]),
    __metadata("design:returntype", void 0)
], TimeController.prototype, "update", null);
exports.TimeController = TimeController = __decorate([
    (0, swagger_1.ApiTags)('time'),
    (0, common_1.Controller)('time'),
    __metadata("design:paramtypes", [time_service_1.TimeService])
], TimeController);
//# sourceMappingURL=time.controller.js.map