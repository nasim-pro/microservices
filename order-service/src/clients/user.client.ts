import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClient {

    constructor(private httpService: HttpService, ) { }

    async getUser(userId: string, authHeader?: string) {
        try {
        const config = authHeader ? { headers: { Authorization: authHeader } } : {};
        const response = await firstValueFrom(
            this.httpService.get(`http://user-service:2024/users/${userId}`, config)
        );
        return response.data;
        } catch (err: any) {
            console.error(err.message)
            return null
        }
    }
}