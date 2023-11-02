import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Response } from 'express';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(body: any, createCustomerDto: CreateCustomerDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(res: Response, skip: number, take: number): Promise<void>;
    findAllCustomer(res: Response, q: string): Promise<Response<any, Record<string, any>>>;
}
