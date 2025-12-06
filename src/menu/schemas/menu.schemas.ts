import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MenuItem extends Document {
  @Prop({ required: true })
  itemName: string;

  @Prop({ required: true })
  itemPrice: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop()
  description: string;

  @Prop()
  imageUrl?: string;

  @Prop({ required: true })
  bizId: string;  // Linked to Business who owns this item

  @Prop()
  category?: string; // For future grouping
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
