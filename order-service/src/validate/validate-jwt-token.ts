import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ValidateTokenInterceptor implements NestInterceptor {
    private jwtService: JwtService;
    constructor() {
        this.jwtService = new JwtService({
            secret: process.env.JWT_SECRET,
        });
     }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) throw new UnauthorizedException('Token missing');
        const token = authHeader.split(' ')[1];
        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }

        return next.handle();
    }
}