import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Catch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const response = await this.authService.signIn(signInDto.email, signInDto.password);
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: error.message,
        });
      } else if (error.status === HttpStatus.UNAUTHORIZED) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: error.message,
        });
      } else if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
        });
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: 'An unexpected error occurred',
        });
      }
    }
  }
}
