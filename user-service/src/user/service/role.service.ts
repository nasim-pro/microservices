import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../model/role.schema';
import { RoleDto } from '../user.dto';

@Injectable()
export class RoleService {
    constructor(
        @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    ) {}

    async create(roleDto: RoleDto) {
        const user = new this.roleModel(roleDto);
        return user.save();
    }

}
