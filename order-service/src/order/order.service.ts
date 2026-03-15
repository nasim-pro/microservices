import { Injectable, BadRequestException } from '@nestjs/common';
import { UserClient } from '../clients/user.client';
import { ProductClient } from '../clients/product.client';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderService {

    constructor(
        private userClient: UserClient,
        private productClient: ProductClient
    ) { }

    async createOrder(dto: CreateOrderDto) {

        const user = await this.userClient.getUser(dto.userId);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const product = await this.productClient.getProduct(dto.productId);
        if (!product) {
            throw new BadRequestException('Product not found');
        }

        const order = {
            id: Date.now().toString(),
            userId: dto.userId,
            productId: dto.productId,
            quantity: dto.quantity,
            totalPrice: product.price * dto.quantity
        };

        return order;
    }
}