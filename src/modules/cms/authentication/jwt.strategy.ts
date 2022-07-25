import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '../../../common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(Users.name) public userModel: Model<UsersDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  /**
   *
   * @param payload
   */
  async validate(payload: any) {
    const user = await this.userModel
      .findById(payload._id)
      .select([
        '_id',
        'email',
        'name',
        'role',
        'phoneNumber',
        'status',
        'user_type',
        'gender',
        'createdAt',
        'updatedAt',
      ])
      .exec();
    if (!user) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Permission denied',
      });
    }
    return { ...user['_doc'] };
  }
}
