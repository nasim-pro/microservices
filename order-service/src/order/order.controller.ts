import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Post()
    createOrder(@Body() body: any) {
        return this.orderService.createOrder(body);
    }
}