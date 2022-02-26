"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL = exports.AUTH = exports.REDIS = exports.MONGO_DB = exports.CROSS_DOMAIN = exports.PROJECT = exports.APP = void 0;
const path_1 = __importDefault(require("path"));
const yargs_1 = require("yargs");
const ROOT_PATH = path_1.default.join(__dirname, '..');
const packageJSON = require(path_1.default.resolve(ROOT_PATH, 'package.json'));
exports.APP = {
    PORT: 3000,
    ROOT_PATH,
    DEFAULT_CACHE_TTL: 60 * 60 * 24,
    MASTER: 'Name6',
    NAME: 'edu-cms',
    ADMIN_EMAIL: '1871731528@qq.com',
};
exports.PROJECT = {
    name: packageJSON.name,
    version: packageJSON.version,
    author: packageJSON.author,
};
exports.CROSS_DOMAIN = {
    allowedOrigins: [],
    allowedReferer: '',
};
exports.MONGO_DB = {
    uri: `mongodb://${yargs_1.argv.dbhost || '127.0.0.1'}:${yargs_1.argv.dbport || '27017'}/edu_cms`,
    username: yargs_1.argv.db_username || '',
    password: yargs_1.argv.db_password || '',
};
exports.REDIS = {
    host: yargs_1.argv.redis_host || '127.0.0.1',
    port: yargs_1.argv.redis_port || 6379,
    username: (yargs_1.argv.redis_username || null),
    password: (yargs_1.argv.redis_password || ''),
};
exports.AUTH = {
    expiresIn: yargs_1.argv.auth_expires_in || 3600,
    refreshExpiresIn: yargs_1.argv.auth_refresh_expires_in || 3600 * 24 * 5,
    jwtTokenSecret: yargs_1.argv.auth_key || 'edu_cms',
    defaultPassword: yargs_1.argv.auth_default_password || '123456',
};
exports.EMAIL = {
    account: yargs_1.argv.email_account || '1871731528@qq.com',
    password: yargs_1.argv.email_password || '',
};
//# sourceMappingURL=app.config.js.map