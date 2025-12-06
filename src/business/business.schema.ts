import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema()
export class Business extends Document {
  @Prop()
  name: string;

  @Prop({ type: [String] })
  category: string[];

  @Prop()
  createdBy: mongoose.Types.ObjectId;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop()
  aadhar?: string;

  @Prop()
  pan?: string;

  @Prop()
  gst?: string;

  @Prop()
  address?: string;

  @Prop({ default: false })
isApproved: boolean;

}

export const BusinessSchema = SchemaFactory.createForClass(Business);
export type BusinessDocument = Business & Document;
