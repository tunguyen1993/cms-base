import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { PermissionsService } from '../modules/cms/permission/permissions.service';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService, Permissions, PermissionsDocument } from '../common';
import { Model } from 'mongoose';

@Injectable()
export class PermissionSeed extends BaseService<Permissions> {
  constructor(
    @InjectModel(Permissions.name)
    public permissionModel: Model<PermissionsDocument>,
  ) {
    super(permissionModel);
  }

  @Command({
    command: 'seed:permission',
    describe: 'create permission',
  })
  async seedPermission() {
    const permissions = [
      {
        action: 'read',
        model: 'roles',
      },
      {
        action: 'write',
        model: 'roles',
      },
      {
        action: 'delete',
        model: 'roles',
      },
      {
        action: 'update',
        model: 'roles',
      },
      {
        action: 'read',
        model: 'permissions',
      },
      {
        action: 'write',
        model: 'permissions',
      },
      {
        action: 'delete',
        model: 'permissions',
      },
      {
        action: 'update',
        model: 'permissions',
      },
      {
        action: 'read',
        model: 'users',
      },
      {
        action: 'write',
        model: 'users',
      },
      {
        action: 'delete',
        model: 'users',
      },
      {
        action: 'update',
        model: 'users',
      },
    ];
    await this.actionCreateMany(permissions);
    console.log('ADD PERMISSION SUCCESS');
  }
}
