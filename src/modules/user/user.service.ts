import { Injectable } from '@nestjs/common';
import { InjectModel } from '@/common/transformers/model.transformer';
import { User } from './user.model';
import { MongooseModel } from '@/interfaces/mongoose.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: MongooseModel<User>) {}

  async findOne(info: { username?: string; id?: number }): Promise<User> {
    const user = await this.userModel.findOne(info);
    if (!user) throw 'The user is not exist';
    return user;
  }

  async createOne(user: User) {
    this.userModel.create(user);
  }

  async getUserList(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }
}
