import { Injectable, BadRequestException } from '@nestjs/common';
import { UserClient } from '../clients/user.client';
import { ProductClient } from '../clients/product.client';
import { CreateOrderDto } from './order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { sendOrderCreatedEvent } from '../kafka/producer';

@Injectable()
export class OrderService {

    constructor(
        private userClient: UserClient,
        private productClient: ProductClient,
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>
    ) { }


async createOrder(dto: CreateOrderDto, authHeader ?: string) {
    const user = await this.userClient.getUser(dto.userId, authHeader);
    if (!user) {
        throw new BadRequestException('User not found');
    }

    const product = await this.productClient.getProduct(dto.productId, authHeader);
    if (!product) {
        throw new BadRequestException('Product not found');
    }

    if (product.stock < dto.quantity) {
        throw new BadRequestException(
            `Product out of stock. Only ${product.stock} left`
        );
    }

    // Create order 
    const order = await this.orderModel.create(dto);

    //Publish event asynchronously
    await sendOrderCreatedEvent({
        orderId: order._id.toString(),
        productId: dto.productId,
        quantity: dto.quantity,
    });

    return order;
}
}

