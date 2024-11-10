import {
    Controller,
    Post,
    Body,
    Param,
    Get,
    HttpStatus,
    HttpException,
    UseGuards,
    Req,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { BlogService } from './blog.service';
  import { CreateBlogDto } from './dto/create-blog.dto';
  import { Request } from 'express';
  import { AuthGuard } from 'src/auth/auth.guard';
  import { Types } from 'mongoose';
  import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
  
  @Controller('blogs')
  export class BlogController {
    constructor(
      private readonly blogService: BlogService,
      private readonly configService: ConfigService,
    ) {}
  
    @UseGuards(AuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const ext = file.originalname.split('.').pop();
          cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
        }
      }),
      fileFilter: (req, file, cb) => {
        // Only allow image files
        if (!file.mimetype.match(/^image\/(jpeg|png|gif|bmp|webp)$/)) {
          return cb(new HttpException('Only image files are allowed', HttpStatus.BAD_REQUEST), false);
        }
        cb(null, true);
      }
    }))
    async createBlog(
      @Body() createBlogDto: CreateBlogDto,
      @Req()
      req: Request & {
        user: {
          userId: string;
          email: string;
        };
      },
      @UploadedFile() file: Express.Multer.File
    ) {
      try {
        const user = req.user;
        if (!user) {
          throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        }
        const userId = new Types.ObjectId(user.userId);
        const imageUrl = file ? `/uploads/${file.filename}` : '';  // Store the relative URL
        const createdBlog = await this.blogService.create(createBlogDto, userId, imageUrl);
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Blog created successfully',
          data: createdBlog,
        };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException(
            'Failed to create blog',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  
    @UseGuards(AuthGuard)
    @Get("")
    async getBlogsByDefaultCategory() {
      try {
        const defaultCategoryId = this.configService
          .get<string>('DEFAULT_CATEGORY')
          .toString();
        const categoryObjectId = new Types.ObjectId(defaultCategoryId);
  
        const blogs = await this.blogService.findByCategory(categoryObjectId);
  
        if (!blogs || blogs.length === 0) {
          throw new HttpException(
            'No blogs found for the default category',
            HttpStatus.NOT_FOUND,
          );
        }
        return {
          statusCode: HttpStatus.OK,
          message: 'Blogs retrieved successfully',
          data: blogs,
        };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException(
            'Failed to retrieve blogs',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
  
    @UseGuards(AuthGuard)
    @Get('category/:categoryId')
    async getBlogsByCategory(@Param('categoryId') categoryId: string) {
      try {
        const categoryObjectId = new Types.ObjectId(categoryId);
        const blogs = await this.blogService.findByCategory(categoryObjectId);
  
        if (!blogs || blogs.length === 0) {
          throw new HttpException(
            'No blogs found for this category',
            HttpStatus.NOT_FOUND,
          );
        }
        return {
          statusCode: HttpStatus.OK,
          message: 'Blogs retrieved successfully',
          data: blogs,
        };
      } catch (error) {
        if (error instanceof HttpException) {
          throw error;
        } else {
          throw new HttpException(
            'Failed to retrieve blogs',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
    }
    @UseGuards(AuthGuard)
@Get(':blogId')
async getBlogById(@Param('blogId') blogId: string) {
  try {
    const blogObjectId = new Types.ObjectId(blogId);
    const blog = await this.blogService.findById(blogObjectId);

    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.NOT_FOUND);
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Blog retrieved successfully',
      data: blog,
    };
  } catch (error) {
    if (error instanceof HttpException) {
      throw error;
    } else {
      throw new HttpException(
        'Failed to retrieve blog',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
}
  