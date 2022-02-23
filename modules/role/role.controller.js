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
exports.RoleController = void 0;
const http_decorator_1 = require("../../common/decorators/http.decorator");
const permission_optional_decorator_1 = require("../../common/decorators/permission-optional.decorator");
const query_params_decorator_1 = require("../../common/decorators/query-params.decorator");
const req_user_decorator_1 = require("../../common/decorators/req-user.decorator");
const common_1 = require("@nestjs/common");
const role_model_1 = require("./role.model");
const role_service_1 = require("./role.service");
let RoleController = class RoleController {
    constructor(roleService) {
        this.roleService = roleService;
    }
    async list() {
        return await this.roleService.getList();
    }
    async roleList({ options, origin }) {
        const { name } = origin;
        const query = {};
        if (name)
            query['name'] = name;
        const roles = await this.roleService.paginator(query, options);
        return roles;
    }
    add(body, req) {
        const user_id = req.user.id;
        this.roleService.createOne(Object.assign(Object.assign({}, body), { user_id }));
        return true;
    }
    update(body, req) {
        const user_id = req.user.id;
        this.roleService.updateOne(Object.assign(Object.assign({}, body), { user_id }));
        return true;
    }
    async getMenus(id) {
        const menus = await this.roleService.getMenus(id);
        return menus;
    }
    async getPerms(id) {
        const perms = await this.roleService.getMenuPerms(id);
        return perms;
    }
    delete(body) {
        this.roleService.deleteOne(body.id);
        return true;
    }
};
__decorate([
    (0, common_1.Get)('list'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle({ message: 'Get role list' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "list", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle('Get role list'),
    __param(0, (0, query_params_decorator_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "roleList", null);
__decorate([
    (0, common_1.Post)('add'),
    http_decorator_1.HttpProcessor.handle({
        message: 'Add role',
        success: common_1.HttpStatus.CREATED,
        error: common_1.HttpStatus.BAD_REQUEST,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_model_1.RoleInfo, Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "add", null);
__decorate([
    (0, common_1.Put)('update'),
    http_decorator_1.HttpProcessor.handle({ message: 'Update role', error: common_1.HttpStatus.BAD_REQUEST }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_model_1.RoleInfo, Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('menu'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle({ message: 'Get menu' }),
    __param(0, (0, req_user_decorator_1.ReqUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getMenus", null);
__decorate([
    (0, common_1.Get)('perms'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    __param(0, (0, req_user_decorator_1.ReqUser)('role')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleController.prototype, "getPerms", null);
__decorate([
    (0, common_1.Delete)('delete'),
    http_decorator_1.HttpProcessor.handle('Delete role'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RoleController.prototype, "delete", null);
RoleController = __decorate([
    (0, common_1.Controller)('role'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleController);
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map