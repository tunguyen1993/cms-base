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
  public async login(user: Users) {
    const encode = {
      _id: user['_id'],
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
    const access_token = await this.generateToken(encode);
    const refresh_token = await this.generateToken(encode, 'refresh');
    await this.setCurrentRefreshToken(refresh_token, user['_id'].toString());
    return {
      access_token,
      refresh_token,
      user,
    };
  }

  /**
   *
   * @private
   * @param user
   * @param type
   */
  private async generateToken(
    user: any,
    type: string | undefined = undefined,
  ): Promise<string> {
    if (type === 'refresh') {
      return this.jwtService.sign(user, {
        secret: process.env.JWTKEY,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
      });
    }
    return this.jwtService.sign(user, {
      secret: process.env.JWTKEY,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
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
