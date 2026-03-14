import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { AuthModule } from '../auth/auth.module';
import { Role, RoleSchema } from './model/role.schema';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
    AuthModule
  ],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController]
})
export class UserModule {}
