import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductClient {

    constructor(private httpService: HttpService) { }

    async getProduct(productId: string) {
        const response = await firstValueFrom(
            this.httpService.get(`http://localhost:2026/products/${productId}`)
        );

        return response.data;
    }
}