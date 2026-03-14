import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { RoleDto } from '../user.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('roles')
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
    ){}
    @Post()
    @UseGuards(AuthGuard)
    createRole(@Body() roleDto: RoleDto){
       return this.roleService.create(roleDto)
    }
}
