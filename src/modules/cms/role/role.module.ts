import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Roles, Permissions } from '../../../common';
import PermissionSchema from '../../../common/database/schemas/permission.schema';
import RoleSchema from '../../../common/database/schemas/role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Roles.name, schema: RoleSchema },
      { name: Permissions.name, schema: PermissionSchema },
    ]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
