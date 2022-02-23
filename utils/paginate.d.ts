import { Model, Document, Schema, FilterQuery, QueryOptions } from 'mongoose';
export interface PaginateResult<T> {
    items: Array<T>;
    total: number;
    page: number;
    pageSize: number;
    totalPage: number;
    offset?: number;
}
export interface PaginateOptions {
    page: number;
    pageSize: number;
    offset: number;
    select: string | object;
    sort: QueryOptions['sort'];
    populate: QueryOptions['populate'];
    lean: QueryOptions['lean'];
    queryOptions: QueryOptions;
}
export interface PaginateModel<T extends Document> extends Model<T> {
    paginate(query?: FilterQuery<T>, options?: Partial<PaginateOptions>): Promise<PaginateResult<T>>;
}
export declare function mongoosePaginate(schema: Schema): void;
export declare function paginate<T>(this: Model<T>, filterQuery?: FilterQuery<T>, options?: Partial<PaginateOptions>): Promise<PaginateResult<T>>;
