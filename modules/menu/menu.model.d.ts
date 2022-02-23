import { MenuType } from './menu.enum';
export declare class Menu {
    id: number;
    parent_id: number;
    name: string;
    route?: string;
    component?: string;
    perms?: string;
    type: MenuType;
    icon?: string;
    order_num: number;
    keepalive: boolean;
    create_at?: Date;
    update_at?: Date;
    status: boolean;
}
export declare class MenuInfo {
    id?: number;
    parent_id?: number;
    status?: boolean;
    name: string;
    keepalive?: boolean;
    type: number;
    component?: string;
    icon?: string;
    route?: string;
    perms?: string;
    is_ext?: boolean;
}
export declare const MenuProvider: import("@nestjs/common").Provider<any>;
