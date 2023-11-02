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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userRepository;
    jwtService;
    configService;
    constructor(userRepository, jwtService, configService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(loginUserDto) {
        const user = await this.userRepository.findOne({
            where: { userName: loginUserDto.userName }
        });
        if (!user) {
            throw new common_1.HttpException("User Name is not exist", common_1.HttpStatus.UNAUTHORIZED);
        }
        ;
        if (user.password != loginUserDto.password) {
            throw new common_1.HttpException("Password is not correct", common_1.HttpStatus.UNAUTHORIZED);
        }
        const payload = { id: user.id, userName: user.userName, role: user.role };
        return this.generateToken(payload);
    }
    async generateToken(payload) {
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('SECRET'),
            expiresIn: this.configService.get('EXP_IN_REFRESH_TOKEN')
        });
        await this.userRepository.update({ userName: payload.userName }, { refreshToken, });
        return { accessToken, refreshToken };
    }
    async refreshToken(refreshToken) {
        try {
            const verify = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('SECRET')
            });
            const checkExistToken = await this.userRepository.findOneBy({ userName: verify.userName, refreshToken });
            if (checkExistToken) {
                return this.generateToken({ id: verify.id, userName: verify.userName });
            }
            else {
                throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            throw new common_1.HttpException('Refresh token is not valid', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    create(createAuthDto) {
    }
    async checkToken(userName) {
        const user = await this.userRepository.findOne({
            where: { userName: userName }
        });
        console.log("🚀 ~ file: auth.service.ts:73 ~ AuthService ~ checkToken ~ user:", user);
        return user;
    }
    findOne(id) {
        return `This action returns a #${id} auth`;
    }
    update(id, updateAuthDto) {
        return `This action updates a #${id} auth`;
    }
    remove(id) {
        return `This action removes a #${id} auth`;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map