import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {

    @Prop({ type: 'ObjectId', ref: 'Product', required: true })
    userId!: string;

    @Prop({ type: 'ObjectId', ref: 'Product', required: true })
    productId!: string;

    @Prop({ type: Number, required: true, default: 1 })
    quantity!: number;

    @Prop({ type: Number, required: true })
    totalPrice!: number;

}

export const OrderSchema = SchemaFactory.createForClass(Order);


