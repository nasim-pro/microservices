import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {

    @IsString()
    @IsNotEmpty()
    userId!: string;

    @IsString()
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @IsNotEmpty()
    quantity!: number;

    @IsNumber()
    @IsNotEmpty()
    totalPrice!: number;
}