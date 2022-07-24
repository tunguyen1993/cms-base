import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Permissions,
  PermissionsDocument,
  Roles,
  RolesDocument,
  BaseService,
} from '../../../common';

@Injectable()
export class RoleService extends BaseService<Roles> {
  constructor(
    @InjectModel(Roles.name) protected rolesModel: Model<RolesDocument>,
    @InjectModel(Permissions.name)
    public permissionModel: Model<PermissionsDocument>,
  ) {
    super(rolesModel);
  }

  async getAllPermission(): Promise<Permissions[]> {
    return this.permissionModel.find();
  }
}
