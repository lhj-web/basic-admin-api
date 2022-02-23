"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const database_module_1 = require("./processors/database/database.module");
const helper_module_1 = require("./processors/helper/helper.module");
const user_module_1 = require("./modules/user/user.module");
const menu_module_1 = require("./modules/menu/menu.module");
const role_module_1 = require("./modules/role/role.module");
const resource_module_1 = require("./modules/resource/resource.module");
const core_1 = require("@nestjs/core");
const auth_guard_1 = require("./common/guards/auth.guard");
const perms_guard_1 = require("./common/guards/perms.guard");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            helper_module_1.HelperModule,
            user_module_1.UserModule,
            menu_module_1.MenuModule,
            role_module_1.RoleModule,
            resource_module_1.ResourceModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: perms_guard_1.PermsGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map