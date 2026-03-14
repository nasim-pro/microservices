import {
    Injectable,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../user/model/user.schema';
import { LoginDto, RefreshDto, RegisterDto } from './auth.dto';




@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async register(dto: RegisterDto) {

        const existingUser = await this.userModel.findOne({
            email: dto.email,
        });

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.userModel.create({
            ...dto, password: hashedPassword,
        });

        return {
            message: 'User registered',
            data: user
        };
    }

    async login(dto: LoginDto) {

        const user: any = await this.userModel.findOne({
            email: dto.email,
        }).populate('role', 'name');

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatch = await bcrypt.compare(
            dto.password,
            user.password,
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.name,
            role: user?.role?.name
        };

        const token = await this.jwtService.signAsync(payload, { expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN') });
        const refreshToken = await this.jwtService.signAsync({ ...payload, type: 'refresh' }, { expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN') })

        return {
            access_token: token,
            refresh_token: refreshToken
        };
    }

    async refreshToken(tokenDto: RefreshDto) {

        const { refresh_token } = tokenDto;

        if (!refresh_token) {
            throw new UnauthorizedException('Refresh token missing');
        }

        let payload: any;

        try {
            payload = await this.jwtService.verifyAsync(refresh_token);
        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        // optional safety check if you add token type
        if (payload.type !== 'refresh') {
            throw new UnauthorizedException('Invalid token type');
        }

        const newPayload = {
            sub: payload.sub,
            email: payload.email,
            role: payload.role,
        };

        const accessToken = await this.jwtService.signAsync(newPayload, {
            expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
        });

        const refreshToken = await this.jwtService.signAsync(
            { ...newPayload, type: 'refresh' },
            {
                expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
            },
        );

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
}