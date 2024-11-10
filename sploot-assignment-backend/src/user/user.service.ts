import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../models/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({
          email: createUserDto.email,
          password: hashedPassword,
        });
        return createdUser.save();
      }
    
      async findOne(email: string): Promise<UserDocument | undefined> {
        return this.userModel.findOne({ email });
      }
}
