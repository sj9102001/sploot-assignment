import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';
import { Category } from './category.schema';

export type BlogDocument = Blog & Document;

@Schema({timestamps: true })
export class Blog extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ })
  description: string;

  @Prop({ })
  link: string;

  @Prop({ type: Types.ObjectId, ref:'Category', required: true })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: User;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
