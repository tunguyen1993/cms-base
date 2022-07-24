import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EditRoleDto } from './dto/editRole.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, PermissionDecorator, Roles, Users } from '../../../common';
import { RoleService } from '../role/role.service';

@Controller({
  version: '1',
})
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
  ) {}

  @ApiTags('Edit Permission')
  @ApiOkResponse({ description: 'Edit Permission Success' })
  @Patch('edit-permission/:user_id')
  @PermissionDecorator('users')
  async editPermission(
    @Body() editRole: EditRoleDto,
    @Param('user_id') id: string,
    @Res() response,
  ) {
    const user: Users | undefined = await this.userService.actionFindById(id);
    const role: Roles | undefined = await this.rolesService.actionFindById(
      editRole.role_id,
    );
    if (!user || !role) {
      throw new NotFoundException();
    }

    const data = await this.userService.actionFindByIdAndUpdate(id, {
      role: {
        role_name: role.name,
        role_id: role['_id'],
        permission: role.permissions,
      },
    });
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Edit Role User Success',
      data,
    });
  }

  @Get()
  @PermissionDecorator('users')
  async test(@Res() response) {
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Edit Role User Success',
      data: 111,
    });
  }
}
