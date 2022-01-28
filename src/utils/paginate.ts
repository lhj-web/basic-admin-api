/**
 * @file mongoose paginate plugin
 * @module utils/paginate
 * @author Name6
 */

import { QueryOptions, Model, FilterQuery, Document } from 'mongoose';

// const DEFAULT_OPTIONS = Object.freeze({
//   page: 1,
//   perPage: 16,
//   offset: 0,
//   lean: false,
// });

export interface PaginateResult<T> {
  documents: Array<T>;
  total: number;
  page: number;
  perPage: number;
  totalPage: number;
  offset?: number;
}

export interface PaginateOptions {
  /** paginate options */
  page: number;
  perPage: number;
  offset: number;
  select: string | object;
  /** mongoose queryOptions */
  sort: QueryOptions['sort'];
  populate: QueryOptions['populate'];
  lean: QueryOptions['lean'];
  /** original options for `model.find` */
  queryOptions: QueryOptions;
}

export interface PaginateModel<T extends Document> extends Model<T> {
  paginate(
    query?: FilterQuery<T>,
    options?: Partial<PaginateOptions>,
  ): Promise<PaginateResult<T>>;
}
