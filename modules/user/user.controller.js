"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const http_decorator_1 = require("../../common/decorators/http.decorator");
const user_service_1 = require("./user.service");
const user_model_1 = require("./user.model");
const permission_optional_decorator_1 = require("../../common/decorators/permission-optional.decorator");
const query_params_decorator_1 = require("../../common/decorators/query-params.decorator");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUserInfo(req) {
        const { id } = req.user;
        const { username, avatar, desc } = await this.userService.findOne({ id });
        return { userId: id, userName: username, portrait: avatar, desc };
    }
    async add(body) {
        const user = await this.userService.findOne({ username: body.username });
        if (user)
            throw 'The user has existed';
        await this.userService.createOne(body);
        return true;
    }
    async update(body) {
        await this.userService.updateOne(body.id, Object.assign({}, body));
        return true;
    }
    async getUserList({ origin, options }) {
        const { username, status } = origin;
        const query = {};
        if (username)
            query['username'] = username;
        if (status)
            query['status'] = !!Number(status);
        const users = await this.userService.getUserList(query, options);
        return users;
    }
    async forbidUser({ id }) {
        const user = await this.userService.findOne({ id });
        if (user.status === true) {
            this.userService.updateOne(id, { status: false });
        }
        else
            throw 'The user has been disabled';
    }
    async enableUser({ id }) {
        const user = await this.userService.findOne({ id });
        if (user.status === false) {
            this.userService.updateOne(id, { status: true });
        }
        else
            throw 'The user has been enable';
    }
    async exist({ username }) {
        const isExist = await this.userService.isUserExist(username);
        return isExist;
    }
    async getUsername({ params }) {
        const user = await this.userService.findOne({ id: params.id });
        return { username: user.username };
    }
};
__decorate([
    (0, common_1.Get)('getInfo'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle('Get user Info'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Post)('add'),
    http_decorator_1.HttpProcessor.handle({
        message: 'Add user',
        success: common_1.HttpStatus.CREATED,
        error: common_1.HttpStatus.BAD_REQUEST,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "add", null);
__decorate([
    (0, common_1.Put)('update'),
    http_decorator_1.HttpProcessor.handle('Update user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('All'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle('Get user list'),
    __param(0, (0, query_params_decorator_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, common_1.Patch)('forbid'),
    http_decorator_1.HttpProcessor.handle({
        message: 'Forbid user',
        success: 200,
        error: common_1.HttpStatus.BAD_REQUEST,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forbidUser", null);
__decorate([
    (0, common_1.Patch)('enable'),
    http_decorator_1.HttpProcessor.handle({
        message: 'Enable user',
        success: 200,
        error: common_1.HttpStatus.BAD_REQUEST,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "enableUser", null);
__decorate([
    (0, common_1.Post)('exist'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "exist", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    __param(0, (0, query_params_decorator_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsername", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map