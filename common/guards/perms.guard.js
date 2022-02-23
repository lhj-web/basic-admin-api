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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermsGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const meta_constant_1 = require("../../constants/meta.constant");
const forbidden_error_1 = require("../../errors/forbidden.error");
const role_service_1 = require("../../modules/role/role.service");
let PermsGuard = class PermsGuard {
    constructor(reflector, moduleRef) {
        this.reflector = reflector;
        this.moduleRef = moduleRef;
    }
    async canActivate(context) {
        const notNeedPerm = this.reflector.get(meta_constant_1.PERMISSION_OPTIONAL_KEY_METADATA, context.getHandler());
        if (notNeedPerm === true)
            return true;
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const { role } = user;
        const path = req.url.split('?')[0].replace(/\//, '');
        const roleService = this.moduleRef.get(role_service_1.RoleService, { strict: false });
        const perms = await roleService.getMenuPerms(role);
        if (!perms.length)
            throw new forbidden_error_1.HttpForbiddenError();
        if (perms.includes(path.replace(/\//g, ':')))
            return true;
        else
            throw new forbidden_error_1.HttpForbiddenError();
    }
};
PermsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        core_1.ModuleRef])
], PermsGuard);
exports.PermsGuard = PermsGuard;
//# sourceMappingURL=perms.guard.js.map