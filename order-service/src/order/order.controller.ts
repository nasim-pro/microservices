import { Controller, Post, Body, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';
import { ValidateToken } from '../validate/validate-token.decorator';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) { }
    @Post()
    @ValidateToken()
    create(
        @Body() dto: CreateOrderDto,
        @Headers('authorization') authHeader: string,
    ) {
        return this.orderService.createOrder(dto, authHeader);
    }



}