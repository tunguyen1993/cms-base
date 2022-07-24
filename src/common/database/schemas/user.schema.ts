import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({
    type: String,
    trim: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
  })
  name: string;

  @Prop({
    type: {
      role_name: {
        type: String,
      },
      role_id: {
        type: mongoose.Schema.Types.ObjectId,
        role: 'roles',
      },
      permission: [
        {
          model: {
            type: mongoose.Schema.Types.String,
            unique: true,
          },
          permission_id: {
            type: mongoose.Schema.Types.ObjectId,
            role: 'permissions',
            unique: true,
          },
          action: {
            type: String,
            unique: true,
          },
        },
      ],
    },
  })
  role: any;

  @Prop({
    type: {
      thumbnail: { type: String, trim: true },
      default: { type: String, trim: true },
    },
  })
  avatar: object;

  @Prop({
    type: String,
    trim: true,
  })
  refreshToken: string;

  @Prop({ required: true, trim: true })
  password: string;

  @Prop({ required: true, trim: true, unique: true, index: true })
  phoneNumber: string;

  @Prop({
    required: true,
    enum: ['ACTIVE', 'DE_ACTIVE'],
    default: 'ACTIVE',
    index: true,
  })
  status: string;

  @Prop({
    required: true,
    enum: ['CMS', 'USER'],
    default: 'USER',
    index: true,
  })
  user_type: string;

  @Prop({
    required: false,
    enum: ['MALE', 'FEMALE'],
    default: 'MALE',
  })
  gender: string;

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

const UserSchema = SchemaFactory.createForClass(Users);

UserSchema.static(
  'findOneOrCreate',
  async function findOneOrCreate(condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
  },
);

UserSchema.pre('save', async function (next) {
  // check if password is present and is modified.
  if (this.password && this.isModified('password')) {
    // call your hashPassword method here which will return the hashed password.
    this.password = await bcrypt.hash(this.password, 10);
  }

  // everything is done, so let's call the next callback.
  next();
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret._id = ret._id.toString();
    if (ret.avatar) {
      ret.avatar = {
        default: `${process.env.BASE_URL}/default/${ret.avatar.default}`,
        thumbnail: `${process.env.BASE_URL}/thumbnail/${ret.avatar.thumbnail}`,
      };
    }
    delete ret['password'];
    delete ret['refreshToken'];
    delete ret.__v;
    return ret;
  },
});
export default UserSchema;
