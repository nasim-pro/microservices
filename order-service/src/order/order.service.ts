import { Injectable, BadRequestException } from '@nestjs/common';
import { UserClient } from '../clients/user.client';
import { ProductClient } from '../clients/product.client';
import { CreateOrderDto } from './order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {

    constructor(
        private userClient: UserClient,
        private productClient: ProductClient,
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>
    ) { }

    async createOrder(dto: CreateOrderDto, authHeader?: string) {
            const user = await this.userClient.getUser(dto.userId, authHeader);
            if (!user) {
                throw new BadRequestException('User not found');
            }

            const product = await this.productClient.getProduct(dto.productId, authHeader);

            if (!product) {
                throw new BadRequestException('Product not found');
            }

            const left = product.stock - dto.quantity;

            if (left < 0) {
                throw new BadRequestException(`Product out of stock only ${product.stock} stocks are left`)
            }

            const updated = this.productClient.updateProduct(product._id, { stock: left }, authHeader)
            const order = this.orderModel.create(dto)

            return order;
    }
}

