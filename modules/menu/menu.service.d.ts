/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { MongooseModel } from '@/interfaces/mongoose.interface';
import { Menu, MenuInfo } from './menu.model';
export declare class MenuService {
    private readonly menuModel;
    constructor(menuModel: MongooseModel<Menu>);
    addOne(menu: MenuInfo): void;
    updateOne(menu: MenuInfo): void;
    deleteOne(id: number): void;
    getAllMenu(query: any): Promise<any[]>;
    getMenuList(ids: number[]): Promise<(import("mongoose").Document<any, import("@typegoose/typegoose/lib/types").BeAnObject, any> & Menu & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction & {
        _id: any;
    })[]>;
    getPerms(ids: number[]): Promise<string[]>;
}
