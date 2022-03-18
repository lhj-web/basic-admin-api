import { createClient } from 'redis';
import { CacheStoreFactory, CacheStoreSetOptions, CacheModuleOptions } from '@nestjs/common';
export declare type RedisStoreOptions = Parameters<typeof createClient>[0];
export declare type RedisCacheStore = ReturnType<typeof createRedisStore>;
export interface CacheStoreOptions extends CacheModuleOptions {
    redisOptions: RedisStoreOptions;
}
declare const createRedisStore: (options: CacheStoreOptions) => {
    set: <T>(key: string, value: T, options?: CacheStoreSetOptions<T>) => Promise<void>;
    get: <T_1>(key: string) => Promise<T_1>;
    del: (key: string) => Promise<void>;
    client: any;
};
declare const redisStoreFactory: CacheStoreFactory;
export default redisStoreFactory;
