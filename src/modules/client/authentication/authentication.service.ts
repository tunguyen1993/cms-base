import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  Users,
  UsersDocument,
  BaseAuthenticationService,
} from '../../../common';

@Injectable()
export class AuthenticationService extends BaseAuthenticationService {
  constructor(
    @InjectModel(Users.name) protected userModel: Model<UsersDocument>,
    protected readonly jwtService: JwtService,
  ) {
    super(userModel, jwtService);
  }

  /**
   *
   * @param userLogin
   */
  async validateUser(userLogin): Promise<Users> {
    const user: Users | undefined = await this.userModel
      .findOne({
        email: userLogin.email.trim(),
        user_type: 'USER',
      })
      .exec();
    if (!user) {
      throw new HttpException('invalid email and password!', 403);
    }
    const compare = await bcrypt.compare(userLogin.password, user.password);
    if (!compare) {
      throw new HttpException('Error  password!', 403);
    }
    return user;
  }
}
