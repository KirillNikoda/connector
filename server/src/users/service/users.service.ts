import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from 'src/auth/dto/register.dto';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async create(user: RegisterUserDto) {
    return this.userModel.create(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  public async findOne(id: string) {
    return this.userModel.findOne({ id });
  }

  public async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  public async update() {}

  public async delete(id: string) {
    return this.userModel.deleteOne({ id });
  }
}
