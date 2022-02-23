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
exports.RoleService = void 0;
const model_transformer_1 = require("../../common/transformers/model.transformer");
const common_1 = require("@nestjs/common");
const menu_service_1 = require("../menu/menu.service");
const role_model_1 = require("./role.model");
let RoleService = class RoleService {
    constructor(roleModel, menuService) {
        this.roleModel = roleModel;
        this.menuService = menuService;
    }
    async getList() {
        const roles = this.roleModel.find({}, { menus: false, _id: false }).exec();
        return roles;
    }
    paginator(query, options) {
        options.select = { _id: 0, update_at: 0 };
        return this.roleModel.paginate(query, options);
    }
    async findRoleById(id) {
        const role = await this.roleModel.findOne({ id }).exec();
        if (!role)
            throw '该角色不存在!';
        return role;
    }
    async createOne(role) {
        const info = await this.roleModel.findOne({ label: role.label });
        if (info)
            throw 'The role has existed';
        this.roleModel.create(role);
    }
    async updateOne(role) {
        const info = await this.roleModel.findOne({ label: role.label }).exec();
        if (info && info.id !== Number(role.id))
            throw 'The role has existed';
        this.roleModel
            .updateOne({ label: role.label }, Object.assign(Object.assign({}, role), { id: Number(role.id) }))
            .exec();
    }
    deleteOne(id) {
        if (!id)
            throw 'id不存在';
        this.roleModel.deleteOne({ id }).exec();
    }
    async getMenuPerms(id) {
        const role = await this.findRoleById(id);
        const perms = await this.menuService.getPerms(role.menus);
        return perms;
    }
    async getMenus(id) {
        const role = await this.findRoleById(id);
        const menus = await this.menuService.getMenuList(role.menus);
        const newMenus = menus.map((menu) => {
            const { name, route, parent_id, component, icon, id, keepalive, order_num } = menu;
            return {
                id,
                path: route,
                name: route === null || route === void 0 ? void 0 : route.replace(/\//g, '').toUpperCase(),
                parent_id,
                component,
                meta: {
                    title: name,
                    icon,
                    ignoreKeepAlive: !keepalive,
                    orderNo: order_num,
                },
                children: [],
            };
        });
        const map = new Map();
        newMenus.forEach((menu) => {
            map.set(menu.id, menu);
        });
        const routes = [];
        for (const menu of newMenus) {
            const parent = map.get(menu.parent_id);
            if (parent)
                parent.children.push(menu);
            else
                routes.push(menu);
        }
        for (const route of routes) {
            route.redirect = returnPath(route);
            remomvePro(route);
        }
        function returnPath(route) {
            if (!route.children[0]) {
                return route.path;
            }
            return route.path + `/${returnPath(route.children[0])}`;
        }
        function remomvePro(route) {
            if (route.children.length) {
                for (const child of route.children) {
                    remomvePro(child);
                }
            }
            else {
                delete route.children;
            }
            delete route.id;
            delete route.parent_id;
            return;
        }
        return routes;
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, model_transformer_1.InjectModel)(role_model_1.Role)),
    __metadata("design:paramtypes", [Object, menu_service_1.MenuService])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map