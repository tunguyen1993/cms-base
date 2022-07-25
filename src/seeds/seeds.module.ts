import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { PermissionSeed } from './permission.seed';
import { MongooseModule } from '@nestjs/mongoose';
import { Permissions, Roles, Users } from '../common';
import PermissionSchema from '../common/database/schemas/permission.schema';
import { RoleSeed } from './role.seed';
import RoleSchema from '../common/database/schemas/role.schema';
import UserSchema from '../common/database/schemas/user.schema';
import { UserSeed } from './user.seed';
import { IndexSeed } from './index.seed';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permissions.name, schema: PermissionSchema },
      { name: Roles.name, schema: RoleSchema },
      { name: Users.name, schema: UserSchema },
    ]),
    CommandModule,
  ],
  providers: [PermissionSeed, RoleSeed, UserSeed, IndexSeed],
  exports: [PermissionSeed, RoleSeed, UserSeed, IndexSeed],
})
export class SeedsModule {}
