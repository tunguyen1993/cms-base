import { SetMetadata } from '@nestjs/common';
import { PermissionDecoratorInterface } from '../interfaces';

export const PermissionDecorator = (
  ...permission: PermissionDecoratorInterface[]
) => {
  return SetMetadata('permission', permission);
};
