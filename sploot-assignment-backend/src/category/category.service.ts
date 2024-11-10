import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/models/category.schema';
import { seedCategories } from 'src/models/seedCategories';

@Injectable()
export class CategoryService implements OnModuleInit {

  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async onModuleInit() {
    // Check if categories are already in the database
    const count = await this.categoryModel.countDocuments();
    if (count === 0) {
      // Seed the data if no categories exist
      await this.categoryModel.insertMany(seedCategories);
      console.log("Seeded categories into MongoDB");
    }
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.find();
  }
}
