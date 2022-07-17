import { Injectable } from '@nestjs/common';
import { InjectModel } from '@/common/transformers/model.transformer';
import { MongooseModel } from '@/interfaces/mongoose.interface';
import { PaginateOptions, PaginateResult } from '@/utils/paginate';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: MongooseModel<User>) {}

  async findOne(info: { username?: string; id?: number }): Promise<User> {
    const user = await this.userModel.findOne(info).exec();
    if (!user)
      throw new Error('The user is not exist');
    return user;
  }

  async createOne(user: User) {
    await this.userModel.create(user);
  }

  getUserList(query, options: PaginateOptions): Promise<PaginateResult<User>> {
    options.select = { _id: 0, password: 0, update_at: 0 };
    return this.userModel.paginate(query, options);
  }

  async updateOne(id: number, data) {
    await this.userModel.updateOne({ id }, { ...data }).exec();
  }

  async isUserExist(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (user)
      return user.id;
    return false;
  }
}
