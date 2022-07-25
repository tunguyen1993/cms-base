import { SetMetadata } from '@nestjs/common';

export const PermissionModelDecorator = (...permissionsModel: string[]) => {
  return SetMetadata('permission-model', permissionsModel);
};
