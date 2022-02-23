/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose/types/Error" />
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
