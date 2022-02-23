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
exports.MenuService = void 0;
const model_transformer_1 = require("../../common/transformers/model.transformer");
const common_1 = require("@nestjs/common");
const menu_enum_1 = require("./menu.enum");
const menu_model_1 = require("./menu.model");
let MenuService = class MenuService {
    constructor(menuModel) {
        this.menuModel = menuModel;
    }
    addOne(menu) {
        var _a, _b;
        if (menu.type === 1 && ((_a = menu.component) === null || _a === void 0 ? void 0 : _a[0]) !== '/') {
            menu.component = '/' + menu.component;
        }
        if (!menu.parent_id && ((_b = menu.route) === null || _b === void 0 ? void 0 : _b[0]) !== '/') {
            menu.route = '/' + menu.route;
        }
        this.menuModel.create(menu);
    }
    updateOne(menu) {
        var _a, _b;
        if (!menu.id)
            throw 'id不存在';
        if (menu.type === 1 && ((_a = menu.component) === null || _a === void 0 ? void 0 : _a[0]) !== '/') {
            menu.component = '/' + menu.component;
        }
        if (!menu.parent_id && ((_b = menu.route) === null || _b === void 0 ? void 0 : _b[0]) !== '/') {
            menu.route = '/' + menu.route;
        }
        this.menuModel.updateOne({ id: menu.id }, menu).exec();
    }
    deleteOne(id) {
        if (!id)
            throw 'id不存在';
        this.menuModel.deleteOne({ id }).exec();
    }
    async getAllMenu(query) {
        const menus = await this.menuModel.find(query, { _id: false }).exec();
        const map = new Map();
        menus.forEach((menu) => {
            if (menu.type !== menu_enum_1.MenuType.button)
                menu._doc.children = [];
            if (menu.status === false)
                menu._doc.disabled = true;
            map.set(menu.id, menu);
        });
        const newMenus = [];
        for (const menu of menus) {
            const parent = map.get(menu.parent_id);
            if (parent)
                parent._doc.children.push(menu);
            else
                newMenus.push(menu);
        }
        return newMenus;
    }
    getMenuList(ids) {
        const menus = this.menuModel
            .find({ id: { $in: ids }, type: { $in: [0, 1] }, status: true }, { _id: false })
            .exec();
        return menus;
    }
    async getPerms(ids) {
        const menus = await this.menuModel.find({ id: { $in: ids }, type: 2 }).exec();
        if (!menus.length)
            return [];
        const perms = menus.map((menu) => menu.perms);
        return perms;
    }
};
MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, model_transformer_1.InjectModel)(menu_model_1.Menu)),
    __metadata("design:paramtypes", [Object])
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map