import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { PermissionSeed } from './permission.seed';
import { InjectModel } from '@nestjs/mongoose';
import {
  Permissions,
  PermissionsDocument,
  Roles,
  RolesDocument,
  Users,
  UsersDocument,
} from '../common';
import { Model } from 'mongoose';
import { RoleSeed } from './role.seed';
import { UserSeed } from './user.seed';

@Injectable()
export class IndexSeed {
  constructor(
    @InjectModel(Permissions.name)
    public permissionModel: Model<PermissionsDocument>,
    @InjectModel(Roles.name) protected rolesModel: Model<RolesDocument>,
    @InjectModel(Users.name) protected userModel: Model<UsersDocument>,
  ) {}
  @Command({
    command: 'seed:all',
    describe: 'create all data ',
  })
  async seedAll() {
    const permissionSeed = new PermissionSeed(this.permissionModel);
    const roleSeed = new RoleSeed(this.permissionModel, this.rolesModel);
    const userSeed = new UserSeed(this.userModel, this.rolesModel);

    await permissionSeed.seedPermission();
    await roleSeed.seedRole();
    await userSeed.seedUser();
  }

  @Command({
    command: 'seed:refresh',
    describe: 'refresh all data',
  })
  async seedRefresh() {
    const permissionSeed = new PermissionSeed(this.permissionModel);
    const roleSeed = new RoleSeed(this.permissionModel, this.rolesModel);
    const userSeed = new UserSeed(this.userModel, this.rolesModel);
    await this.permissionModel.deleteMany({});
    await this.rolesModel.deleteMany({});
    await this.userModel.deleteMany({});

    await permissionSeed.seedPermission();
    await roleSeed.seedRole();
    await userSeed.seedUser();
  }
}
