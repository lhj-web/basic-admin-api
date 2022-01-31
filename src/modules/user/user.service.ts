import { Injectable } from '@nestjs/common';
import { InjectModel } from '@/common/transformers/model.transformer';
import { User } from './user.model';
import { MongooseModel } from '@/interfaces/mongoose.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: MongooseModel<User>) {}

  async findOne(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    return user;
  }

  async createOne(user: User) {
    this.userModel.create(user);
  }
}
