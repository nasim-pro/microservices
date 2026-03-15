import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './order.dto';

@Controller('orders')
export class OrderController {

    constructor(private orderService: OrderService) { }

    @Post()
    create(@Body() dto: CreateOrderDto) {
        return this.orderService.createOrder(dto);
    }
}