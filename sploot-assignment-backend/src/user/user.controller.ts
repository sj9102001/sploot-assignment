import { Controller, Post, Body, Res, Get, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'User created successfully',
        user: user.email,
      });
    } catch (error) {

      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json({
          message: error.message,
        });
      } else if(error.name === "MongoServerError" && error.code === 11000) {
        return res.status(HttpStatus.CONFLICT).json({
          message: "User Already Exists"
        })
      }
      else{
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: 'Failed to create user',
        });
      }
    }
  }
}
