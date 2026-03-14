import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Roles } from '../../decorators/roles.decorator';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ){}

    @Get()
    @UseGuards(AuthGuard)
    @Roles('admin')
    findAllUsers(){
        return this.userService.findAll();
    }
}
