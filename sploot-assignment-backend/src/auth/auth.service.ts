import { Injectable, UnauthorizedException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string, user: {
    email: string,
    userId: any
  } }> {
    // Check if user exists
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    // Check if password is valid
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    try {
      const payload = { userId: user._id, email: user.email };
      return {
        access_token: await this.jwtService.signAsync(payload),
        user: {
          userId: user._id,
          email: user.email
        }
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate JWT token');
    }
  }
}
