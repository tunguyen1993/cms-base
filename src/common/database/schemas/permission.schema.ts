import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PermissionsDocument = Permissions & Document;

@Schema()
export class Permissions {
  @Prop({
    type: String,
    trim: true,
    index: true,
    required: false,
  })
  action: string;

  @Prop({
    type: String,
    trim: true,
    index: true,
  })
  model: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}

const PermissionSchema = SchemaFactory.createForClass(Permissions);
PermissionSchema.index({ action: 1, model: 1 }, { unique: true });
export default PermissionSchema;
