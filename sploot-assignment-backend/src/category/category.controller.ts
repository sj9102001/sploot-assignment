import { Controller, Get, HttpException, HttpStatus, Injectable, Res, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Response } from 'express';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @UseGuards(AuthGuard)
    @Get("")
    async getAllCategories(@Res() res: Response) {
      try {
        const categories = await this.categoryService.findAllCategories();
  
        if (!categories || categories.length === 0) {
          throw new HttpException(
            'No categories found for the default category',
            HttpStatus.NOT_FOUND,
          );
        }
        return res.status(HttpStatus.OK).json( {
          statusCode: HttpStatus.OK,
          message: 'categories retrieved successfully',
          data: categories,
        });
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
  
  }
  