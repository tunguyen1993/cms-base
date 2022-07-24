import { Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import PermissionSchema from '../../../common/database/schemas/permission.schema';
import { Permissions } from '../../../common';
import { SeedsModule } from '../../../seeds/seeds.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permissions.name, schema: PermissionSchema },
    ]),
    SeedsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
