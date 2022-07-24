import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export type RolesDocument = Roles & Document;
@Schema()
export class Roles {
  @Prop({
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: false,
  })
  name: string;

  @Prop({
    type: [
      {
        _id: false,
        model: {
          type: mongoose.Schema.Types.String,
          required: true,
        },
        permission_id: {
          type: mongoose.Schema.Types.ObjectId,
          role: 'permissions',
          required: true,
        },
        action: {
          type: String,
          required: true,
        },
      },
    ],
  })
  permissions: [];

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

const RoleSchema: SchemaFactory = SchemaFactory.createForClass(Roles);

export default RoleSchema;
