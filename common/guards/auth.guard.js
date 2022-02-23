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
exports.JwtAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
const unauthorized_error_1 = require("../../errors/unauthorized.error");
const value_constant_1 = require("../../constants/value.constant");
const core_1 = require("@nestjs/core");
const meta_constant_1 = require("../../constants/meta.constant");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const authorize = this.reflector.get(meta_constant_1.AUTHORIZE_KEY_METADATA, context.getHandler());
        if (authorize)
            return true;
        return super.canActivate(context);
    }
    handleRequest(error, authInfo, errInfo) {
        if (authInfo && !error && !errInfo) {
            return authInfo;
        }
        else {
            throw error || new unauthorized_error_1.HttpUnauthorizedError(value_constant_1.UNDEFINED, errInfo === null || errInfo === void 0 ? void 0 : errInfo.message);
        }
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=auth.guard.js.map