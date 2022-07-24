import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument, BaseService } from '../../../common';

@Injectable()
export class UserService extends BaseService<Users> {
  constructor(
    @InjectModel(Users.name) protected userModel: Model<UsersDocument>,
  ) {
    super(userModel);
  }
}
