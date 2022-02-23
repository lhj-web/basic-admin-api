export declare class User {
    id: number;
    username: string;
    role: number;
    nickname?: string;
    desc?: string;
    avatar?: string;
    password: string;
    create_at?: Date;
    update_at?: Date;
    status: boolean;
}
export declare class UserInfo {
    username: string;
    password: string;
    avatar?: string;
    desc?: string;
}
export declare const UserProvider: import("@nestjs/common").Provider<any>;
