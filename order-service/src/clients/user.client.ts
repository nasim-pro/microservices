import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserClient {

    constructor(private httpService: HttpService) { }

    async getUser(userId: string) {
        const response = await firstValueFrom(
            this.httpService.get(`http://localhost:3001/users/${userId}`)
        );

        return response.data;
    }
}