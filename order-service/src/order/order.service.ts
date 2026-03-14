import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrderService {

    constructor(
        @Inject('USER_SERVICE') private userClient: ClientProxy,
        @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
    ) { }

    async createOrder(data: any) {

        const user = await firstValueFrom(
            this.userClient.send('get_user', data.userId)
        );

        const product = await firstValueFrom(
            this.productClient.send('get_product', data.productId)
        );

        if (!user) throw new Error('User not found');
        if (!product) throw new Error('Product not found');

        const order = {
            id: Date.now(),
            userId: data.userId,
            productId: data.productId,
            quantity: data.quantity,
        };

        return order;
    }
}