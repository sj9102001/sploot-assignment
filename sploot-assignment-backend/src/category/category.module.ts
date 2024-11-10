import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/category.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]), 
    JwtModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
