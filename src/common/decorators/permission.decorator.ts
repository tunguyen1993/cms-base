import { SetMetadata } from '@nestjs/common';

export const PermissionDecorator = (...permissions: string[]) => {
  return SetMetadata('permissions', permissions);
};
