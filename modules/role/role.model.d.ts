export declare class Role {
    id: number;
    name: string;
    user_id: number;
    label: string;
    status: boolean;
    menus: number[];
    desc?: string;
    create_at?: Date;
    update_at?: Date;
}
export declare class RoleInfo {
    id: number;
    name: string;
    label: string;
    status: boolean;
    menus: number[];
    desc?: string;
    user_id?: number;
}
export declare const RoleProvider: import("@nestjs/common").Provider<any>;
