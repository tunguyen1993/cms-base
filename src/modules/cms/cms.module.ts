import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { RoleModule } from './role/role.module';
import { PermissionsModule } from './permission/permissions.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthenticationModule, RoleModule, PermissionsModule, UserModule],
  providers: [],
  controllers: [],
})
export class CmsModule {}
