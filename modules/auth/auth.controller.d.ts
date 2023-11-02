import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class AuthController {
    private readonly authService;
    private jwtService;
    private configService;
    constructor(authService: AuthService, jwtService: JwtService, configService: ConfigService);
    login(loginUserDto: LoginUserDto): Promise<any>;
    create(createAuthDto: CreateAuthDto): void;
    refreshToken({ refresh_token }: {
        refresh_token: any;
    }): Promise<any>;
    findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    private extractTokenFromHeader;
    findOne(id: string): string;
    update(id: string, updateAuthDto: UpdateAuthDto): string;
    remove(id: string): string;
}
