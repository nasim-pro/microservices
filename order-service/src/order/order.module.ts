import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { HttpModule } from '@nestjs/axios';
import { UserClient } from '../clients/user.client';
import { ProductClient } from '../clients/product.client';

@Module({
  imports: [HttpModule],

  providers: [OrderService, UserClient, ProductClient],
  controllers: [OrderController]
})
export class OrderModule {}
