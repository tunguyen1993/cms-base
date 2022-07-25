import { Routes } from '@nestjs/core';
import { AuthenticationModule, ClientModule } from './modules/client';
import {
  PermissionsModule,
  AuthenticationModule as AuthenticationModuleCMS,
  RoleModule,
  UserModule,
  CmsModule,
} from './modules/cms';
export const ROUTE: Routes = [
  {
    path: 'admin',
    module: CmsModule,
    children: [
      {
        path: 'user',
        module: UserModule,
      },
      {
        path: 'role',
        module: RoleModule,
      },
      {
        path: 'permission',
        module: PermissionsModule,
      },
      {
        path: 'auth',
        module: AuthenticationModuleCMS,
      },
    ],
  },
  {
    path: 'client',
    module: ClientModule,
    children: [
      {
        path: '',
        module: AuthenticationModule,
      },
    ],
  },
];
