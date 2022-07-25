import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionsDto } from './dto/createPermissions.dto';
import { UpdatePermissionsDto } from './dto/updatePermissions.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, PermissionDecorator, Permissions } from '../../../common';

@Controller({
  version: '1',
})
@UseGuards(AuthGuard)
export class PermissionsController {
  constructor(protected permissionService: PermissionsService) {}

  /**
   *
   * @param body
   * @param response
   */
  @ApiTags('Create Permission')
  @ApiOkResponse({ description: 'create success' })
  @Post()
  @PermissionDecorator({
    model: Permissions.name,
    action: 'write',
  })
  async createPermission(@Body() body: CreatePermissionsDto, @Res() response) {
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Create Role Success',
      data: await this.permissionService.actionCreate(body),
    });
  }

  /**
   *
   * @param body
   * @param id
   * @param response
   */
  @ApiTags('Update Permission')
  @ApiOkResponse({ description: 'update success' })
  @Patch(':id')
  @PermissionDecorator({
    model: Permissions.name,
    action: 'edit',
  })
  async updatePermission(
    @Body() body: UpdatePermissionsDto,
    @Param('id') id: string,
    @Res() response,
  ) {
    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      description: 'Create Role Success',
      data: 11,
    });
  }
}
