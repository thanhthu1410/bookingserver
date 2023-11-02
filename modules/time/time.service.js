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
exports.TimeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const time_entity_1 = require("./entities/time.entity");
const typeorm_2 = require("typeorm");
let TimeService = class TimeService {
    timeRepository;
    constructor(timeRepository) {
        this.timeRepository = timeRepository;
    }
    create(createTimeDto) {
        return 'This action adds a new time';
    }
    async findAll() {
        try {
            let time = await this.timeRepository.findOne({
                where: {
                    id: 1
                }
            });
            return {
                status: true,
                data: time
            };
        }
        catch {
            return {
                status: false,
                data: null
            };
        }
    }
    async update(updateTimeDto) {
        try {
            let timeSource = await this.timeRepository.findOne({
                where: {
                    id: 1
                }
            });
            let timeSourceUpdate = this.timeRepository.merge(timeSource, updateTimeDto);
            let result = await this.timeRepository.save(timeSourceUpdate);
            return {
                status: true,
                data: result,
                message: "Update ok!"
            };
        }
        catch (err) {
            return {
                status: false,
                data: null,
                message: "Lỗi model"
            };
        }
    }
};
exports.TimeService = TimeService;
exports.TimeService = TimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_entity_1.Time)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TimeService);
//# sourceMappingURL=time.service.js.map