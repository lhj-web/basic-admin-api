/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { MongooseModel } from '@/interfaces/mongoose.interface';
import { PaginateOptions } from '@/utils/paginate';
import { MenuService } from '../menu/menu.service';
import { Role, RoleInfo } from './role.model';
export declare class RoleService {
    private readonly roleModel;
    private readonly menuService;
    constructor(roleModel: MongooseModel<Role>, menuService: MenuService);
    getList(): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Role & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    paginator(query: any, options: PaginateOptions): Promise<import("@/utils/paginate").PaginateResult<import("mongoose").Document<any, any, any> & Role>>;
    findRoleById(id: number): Promise<Role>;
    createOne(role: RoleInfo): Promise<void>;
    updateOne(role: RoleInfo): Promise<void>;
    deleteOne(id: number): void;
    getMenuPerms(id: number): Promise<string[]>;
    getMenus(id: number): Promise<any[]>;
}
