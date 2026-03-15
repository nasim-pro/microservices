import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { UserClient } from '../clients/user.client';
import { ProductClient } from '../clients/product.client';
import { Order, OrderSchema } from './order.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
    ]),
    
    HttpModule
  ],

  providers: [OrderService, UserClient, ProductClient],
  controllers: [OrderController]
})
export class OrderModule {}
