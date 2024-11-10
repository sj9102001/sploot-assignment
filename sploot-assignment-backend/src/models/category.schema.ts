import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

export enum CategoryName {
  SPORTS = 'Sports',
  TECHNOLOGY = 'Technology',
  FOOD = 'Food',
  TRAVEL = 'Travel',
  MUSIC = 'Music',
  GAMING = 'Gaming',
  NEWS = 'News',
  LIFESTYLE = 'Lifestyle'
}

@Schema()
export class Category extends Document {
  @Prop({
    required: true,
    enum: CategoryName,
  })
  name: CategoryName;

  @Prop({ required: true })
  imageUrl: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
