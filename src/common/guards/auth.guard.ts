import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as COREAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard extends COREAuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  /**
   *
   * @param err
   * @param user
   * @param info
   * @param context
   */
  handleRequest(err, user, info, context: ExecutionContext) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    const permissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );
    if (user.user_type === 'USER') {
      return user;
    }

    if (!user.role || !user.role.permission) {
      throw new UnauthorizedException();
    }
    if (!permissions) {
      return user;
    }
    return this.matchPermission(user, permissions);
  }

  matchPermission(user, permission) {
    const hasPermission = user.role.permission.find((elem: any) => {
      return permission.includes(elem.db);
    });
    if (!hasPermission) {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'Permission denied',
      });
    }
    return user;
  }
}
