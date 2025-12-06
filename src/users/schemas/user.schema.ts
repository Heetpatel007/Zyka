import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum Role {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  STAFF = 'staff',
  USER = 'user',
}

@Schema({ timestamps: false ,versionKey: false})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop()
  oauthProvider?: string;

  @Prop()
  oauthId?: string;

  @Prop()
  bizId?: string;

  @Prop()
  businessName?: string;

  @Prop({ type: [String] }) // For array of categories
  businessCategory?: string[];

  @Prop()
  isVerified: boolean

  // @Prop()
  // gstNumber?: string;

  // @Prop({
  //   type: {
  //     adhar: { type: String },
  //     pan: { type: String },
  //   },
  //   default: {},
  // })
  // imgFile?: {
  //   adhar?: string;
  //   pan?: string;
  // };


}

export const UserSchema = SchemaFactory.createForClass(User);
