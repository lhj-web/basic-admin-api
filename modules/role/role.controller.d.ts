/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose/types/Error" />
/// <reference types="mongoose" />
import { RoleInfo } from './role.model';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    list(): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & import("./role.model").Role & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    roleList({ options, origin }: {
        options: any;
        origin: any;
    }): Promise<import("../../utils/paginate").PaginateResult<import("mongoose").Document<any, any, any> & import("./role.model").Role>>;
    add(body: RoleInfo, req: any): boolean;
    update(body: RoleInfo, req: any): boolean;
    getMenus(id: number): Promise<any[]>;
    getPerms(id: number): Promise<string[]>;
    delete(body: any): boolean;
}
