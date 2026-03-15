import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductClient {

    constructor(private httpService: HttpService) { }

    async getProduct(productId: string, authHeader?: string) {
        const config = authHeader ? { headers: { Authorization: authHeader } } : {};
        const response = await firstValueFrom(
            this.httpService.get(`http://localhost:2025/products/${productId}`, config)
        );

        return response.data;
    }

    async updateProduct(productId: string, updateDto: any, authHeader?: string) {
        const config = authHeader ? { headers: { Authorization: authHeader } } : {};
        const response = await firstValueFrom(
            this.httpService.patch(`http://localhost:2025/products/${productId}`, updateDto, config)
        );
        return response.data;
    }
}