import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog } from '../models/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UserDocument } from '../models/user.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto, user: Types.ObjectId, imageUrl: string): Promise<Blog> {
    const blog = new this.blogModel({ ...createBlogDto, category: new Types.ObjectId(createBlogDto.category), createdBy: user._id, link: imageUrl });
    return blog.save();
  }

  async findByCategory(categoryId: Types.ObjectId): Promise<Blog[]> {
    return this.blogModel
    .find({ category: categoryId })
    .populate('createdBy', 'email')
    .populate('createdAt')
    .sort({createdAt: -1})
    .exec();
  }
  async findById(blogId: Types.ObjectId): Promise<Blog | null> {
    return this.blogModel
      .findById(blogId)
      .populate('createdBy', 'email')
      .exec();
  }
}
