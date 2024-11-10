import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog, BlogSchema } from '../models/blog.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]), 
    JwtModule
  ],
  providers: [BlogService],
  controllers: [BlogController],
  exports: [BlogService], 
})
export class BlogModule {}
