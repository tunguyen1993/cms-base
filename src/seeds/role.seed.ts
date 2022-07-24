import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseService,
  Permissions,
  PermissionsDocument,
  Roles,
  RolesDocument,
} from '../common';
import { Model } from 'mongoose';

@Injectable()
export class RoleSeed extends BaseService<Roles> {
  constructor(
    @InjectModel(Permissions.name)
    public permissionModel: Model<PermissionsDocument>,
    @InjectModel(Roles.name) protected rolesModel: Model<RolesDocument>,
  ) {
    super(rolesModel);
  }

  @Command({
    command: 'seed:role',
    describe: 'role create',
  })
  async seedRole() {
    const permissions = await this.permissionModel.find({});
    const permissionImport = [];
    permissions.map((item) => {
      permissionImport.push({
        model: item.model,
        permission_id: item._id,
        action: item.action,
      });
    });
    const roles = [
      {
        name: 'SUPER ADMIN',
        permissions: permissionImport,
      },
    ];
    await this.actionCreateMany(roles);
    console.log('ADD ROLE SUCCESS');
  }
}
