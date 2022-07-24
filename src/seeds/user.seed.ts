import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BaseService,
  Roles,
  RolesDocument,
  Users,
  UsersDocument,
} from '../common';
import { Model } from 'mongoose';
import { Command } from 'nestjs-command';

@Injectable()
export class UserSeed extends BaseService<Users> {
  constructor(
    @InjectModel(Users.name) protected userModel: Model<UsersDocument>,
    @InjectModel(Roles.name) protected rolesModel: Model<RolesDocument>,
  ) {
    super(userModel);
  }

  @Command({
    command: 'seed:user',
    describe: 'create user',
  })
  async seedUser() {
    const role: Roles = await this.rolesModel.findOne({});
    const users = [
      {
        email: 'root@gmail.com',
        name: 'root',
        password: '123456789',
        phoneNumber: Math.floor(Math.random() * 1000000000),
        status: 'ACTIVE',
        user_type: 'CMS',
        gender: 'MALE',
        role: {
          role_name: role.name,
          role_id: role['_id'],
          permission: role.permissions,
        },
      },
      {
        email: 'user@gmail.com',
        name: 'user 1',
        password: Math.floor(Math.random() * 1000000000),
        phoneNumber: Math.floor(Math.random() * 1000000000),
        status: 'ACTIVE',
        user_type: 'USER',
        gender: 'MALE',
      },
    ];
    for (const user of users) {
      await this.actionCreate(user)
        .finally(() => {
          console.log('write success user ' + user.email);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }
}
