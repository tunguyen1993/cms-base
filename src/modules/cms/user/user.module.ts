import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleService } from '../role/role.service';
import PermissionSchema from '../../../common/database/schemas/permission.schema';
import RoleSchema from '../../../common/database/schemas/role.schema';
import UserSchema from '../../../common/database/schemas/user.schema';
import { Users, Roles, Permissions } from '../../../common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema },
      { name: Roles.name, schema: RoleSchema },
      { name: Permissions.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleService],
})
export class UserModule {}
