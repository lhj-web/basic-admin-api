export declare const APP: {
    PORT: number;
    ROOT_PATH: string;
    DEFAULT_CACHE_TTL: number;
    MASTER: string;
    NAME: string;
    ADMIN_EMAIL: string;
};
export declare const PROJECT: {
    name: any;
    version: any;
    author: any;
};
export declare const CROSS_DOMAIN: {
    allowedOrigins: never[];
    allowedReferer: string;
};
export declare const MONGO_DB: {
    uri: string;
    username: unknown;
    password: unknown;
};
export declare const REDIS: {
    host: unknown;
    port: unknown;
    username: string;
    password: string;
};
export declare const AUTH: {
    expiresIn: unknown;
    refreshExpiresIn: unknown;
    jwtTokenSecret: unknown;
    defaultPassword: unknown;
};
export declare const EMAIL: {
    account: unknown;
    password: unknown;
};
