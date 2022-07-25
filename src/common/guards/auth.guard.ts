import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard as COREAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { PermissionDecoratorInterface } from '../interfaces';

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
    const permission = this.reflector.get<PermissionDecoratorInterface[]>(
      'permission',
      context.getHandler(),
    );
    if (user.user_type === 'USER') {
      return user;
    }

    if (!user.role || !user.role.permission) {
      throw new UnauthorizedException();
    }
    if (!permission) {
      return user;
    }
    return this.matchPermission(user, permission);
  }

  matchPermission(user, permission: PermissionDecoratorInterface[]) {
    const permissionClone = [];
    permission.map((item) => {
      permissionClone.push({
        model: item.model.toLowerCase(),
        action: item.action.toLowerCase(),
      });
    });
    const hasPermission = user.role.permission.find((elem: any) => {
      return (permissionClone[0].model =
        elem.model && permissionClone[0].action === elem.action);
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
