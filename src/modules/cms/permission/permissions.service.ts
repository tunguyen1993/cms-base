import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permissions, PermissionsDocument, BaseService } from '../../../common';

@Injectable()
export class PermissionsService extends BaseService {
  constructor(
    @InjectModel(Permissions.name)
    public permissionModel: Model<PermissionsDocument>,
  ) {
    super(permissionModel);
  }
}
