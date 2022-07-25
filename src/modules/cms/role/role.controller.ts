import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/createRole.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateRoleDto } from './dto/updateRole.dto';
import { AuthGuard, PermissionDecorator, Roles } from '../../../common';

@Controller({
  version: '1',
})
@UseGuards(AuthGuard)
export class RoleController {
  constructor(protected readonly rolesService: RoleService) {}

  /**
   *
   * @param body
   * @param response
   */
  @ApiTags('Create Role')
  @ApiOkResponse({ description: 'Create Role Success' })
  @PermissionDecorator({
    model: Roles.name,
    action: 'write',
  })
  @Post()
  async create(@Body() body: CreateRoleDto, @Res() response) {
    const data = await this.rolesService.actionCreate(body);
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Create Role Success',
      data,
    });
  }

  /**
   *
   * @param body
   * @param id
   * @param response
   */
  @ApiTags('Add Permission Role')
  @ApiOkResponse({ description: 'add or remove permission Role Success' })
  @PermissionDecorator({
    model: Roles.name,
    action: 'edit',
  })
  @Patch(':id')
  async updatePermission(
    @Body() body: UpdateRoleDto,
    @Param('id') id: string,
    @Res() response,
  ) {
    /**
     * find role has exits
     */
    const role = await this.rolesService.actionFindById(id);
    /**
     * catch when role is not exits
     */
    if (!role) {
      throw new NotFoundException();
    }

    const query =
      body.type === 'REMOVE_PERMISSION'
        ? {
            $pull: {
              permissions: { $elemMatch: body.permissions },
            },
          }
        : {
            $addToSet: {
              permissions: body.permissions,
            },
          };

    const data = await this.rolesService.actionFindByIdAndUpdate(
      role['_id'],
      query,
    );
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Update Role Success',
      data,
    });
  }
}
