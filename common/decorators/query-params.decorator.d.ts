import { Types } from 'mongoose';
import { PaginateOptions } from '@/utils/paginate';
export declare enum QueryParamsField {
    Page = "page",
    PageSize = "pageSize",
    Sort = "sort",
    Date = "_t",
    State = "state",
    Origin = "origin",
    ParamsId = "paramsId"
}
export interface QueryParamsConfig extends Omit<PaginateOptions, 'populate' | 'select'> {
    [key: string]: void | string | number | boolean | Types.ObjectId | Date | RegExp | QueryParamsConfig | any;
}
export interface QueryVisitor {
    ip: string;
    ua: string;
    referer: string;
}
export interface cookies {
    [key: string]: string;
}
export interface QueryParamsResult {
    querys: Partial<QueryParamsConfig>;
    options: Partial<QueryParamsConfig>;
    params: Partial<QueryParamsConfig>;
    origin: Partial<QueryParamsConfig>;
    request: any;
    visitor: QueryVisitor;
    cookies: cookies;
    isAuthenticated: boolean;
    user: {
        id: number;
        username: string;
        role: number;
    };
}
interface TransformConfigObject {
    [key: string]: string | number | boolean;
}
export declare type TransformConfig = QueryParamsField | string | TransformConfigObject;
export declare const QueryParams: (...dataOrPipes: (TransformConfig[] | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export {};
