import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../models/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
