import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): string;
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): string;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): string;
}
