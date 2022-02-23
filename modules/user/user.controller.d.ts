import { Request } from 'express';
import { UserService } from './user.service';
import { User } from './user.model';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserInfo(req: Request): Promise<{
        userId: number;
        userName: string;
        portrait: string | undefined;
        desc: string | undefined;
    }>;
    add(body: User): Promise<boolean>;
    update(body: User): Promise<boolean>;
    getUserList({ origin, options }: {
        origin: any;
        options: any;
    }): Promise<import("../../utils/paginate").PaginateResult<User>>;
    forbidUser({ id }: {
        id: any;
    }): Promise<void>;
    enableUser({ id }: {
        id: any;
    }): Promise<void>;
    exist({ username }: {
        username: any;
    }): Promise<any>;
    getUsername({ params }: {
        params: any;
    }): Promise<{
        username: string;
    }>;
}
