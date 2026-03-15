import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../model/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) 
        private userModel: Model<UserDocument>,
    ) {}

    async create(userData: any) {
        const user = new this.userModel(userData);
        return user.save();
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email });
    }

    async findById(id: string) {
        return this.userModel.findById(id);
    }

    async findAll(page: number=1, limit: number=10) {
        const skip = (page-1) * limit;
        const count = await this.userModel.countDocuments();
        const users = await this.userModel.find().select('name email').skip(skip).limit(limit);
        return { data: users, totalRecords: count }
    }


    
}
