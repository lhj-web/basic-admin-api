import { User } from './user.model';
import { MongooseModel } from '@/interfaces/mongoose.interface';
import { PaginateOptions, PaginateResult } from '@/utils/paginate';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: MongooseModel<User>);
    findOne(info: {
        username?: string;
        id?: number;
    }): Promise<User>;
    createOne(user: User): Promise<void>;
    getUserList(query: any, options: PaginateOptions): Promise<PaginateResult<User>>;
    updateOne(id: number, data: any): Promise<void>;
    isUserExist(username: string): Promise<any>;
}
