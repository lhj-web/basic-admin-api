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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const menu_service_1 = require("./menu.service");
const http_decorator_1 = require("../../common/decorators/http.decorator");
const menu_model_1 = require("./menu.model");
const permission_optional_decorator_1 = require("../../common/decorators/permission-optional.decorator");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    add(body) {
        this.menuService.addOne(body);
        return true;
    }
    async list(query) {
        const { name, status } = query;
        const info = {};
        if (name)
            info['name'] = name;
        if (status === '0')
            info['status'] = false;
        else if (status === '1')
            info['status'] = true;
        return await this.menuService.getAllMenu(info);
    }
    update(menu) {
        this.menuService.updateOne(menu);
        return true;
    }
    delete({ id }) {
        this.menuService.deleteOne(id);
        return true;
    }
};
__decorate([
    (0, common_1.Post)('add'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle({
        message: 'Add menu',
        success: common_1.HttpStatus.CREATED,
        error: common_1.HttpStatus.BAD_REQUEST,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_model_1.MenuInfo]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "add", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle('Get menu list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "list", null);
__decorate([
    (0, common_1.Put)('update'),
    http_decorator_1.HttpProcessor.handle({ message: 'Update menu', error: common_1.HttpStatus.BAD_REQUEST }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_model_1.MenuInfo]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete'),
    http_decorator_1.HttpProcessor.handle({ message: 'Delete menu', error: common_1.HttpStatus.BAD_REQUEST }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "delete", null);
MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
exports.MenuController = MenuController;
//# sourceMappingURL=menu.controller.js.map