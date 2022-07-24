import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { Users, UsersDocument } from '../database/schemas/user.schema';

@Injectable()
export class BaseAuthenticationService {
  constructor(
    @InjectModel(Users.name) protected userModel: Model<UsersDocument>,
    protected readonly jwtService: JwtService,
  ) {}

  /**
   *
   * @param user
   */
  async login(user: Users) {
    // ...user["_doc"],

    const encode = {
      _id: user['_id'],
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
    const access_token = await this.generateToken(encode);
    const refresh_token = this.jwtService.sign(
      encode,
      BaseAuthenticationService.getTokenOptions('refresh', user),
    );
    await this.setCurrentRefreshToken(refresh_token, user['_id'].toString());
    return {
      access_token,
      refresh_token,
      user,
    };
  }

  /**
   *
   * @param user
   * @private
   */
  private async generateToken(user) {
    return this.jwtService.sign(user, {
      secret: process.env.JWTKEY,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
  }

  /**
   *
   * @param type
   * @param user
   * @private
   */
  private static getTokenOptions(type: string, user: Users) {
    const options: JwtSignOptions = {
      secret: process.env.JWTKEY,
    };
    const expiration: string = process.env.REFRESH_TOKEN_EXPIRATION;
    if (expiration) {
      options.expiresIn = expiration;
    }
    return options;
  }

  /**
   *
   * @param refreshToken
   * @param userId
   */
  public async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    return this.userModel.findByIdAndUpdate(userId, {
      refreshToken: currentHashedRefreshToken,
    });
  }
}
