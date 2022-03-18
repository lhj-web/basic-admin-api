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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_model_1 = require("./auth.model");
const http_decorator_1 = require("../../common/decorators/http.decorator");
const authorize_decorator_1 = require("../../common/decorators/authorize.decorator");
const permission_optional_decorator_1 = require("../../common/decorators/permission-optional.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(body) {
        const { username, password, captchaId, verifyCode } = body;
        await this.authService.checkCaptcha(captchaId, verifyCode);
        const res = await this.authService.adminLogin(username, password);
        return res;
    }
    async refreshToken(req) {
        const { id, username, role } = req.user;
        const token = this.authService.createToken(id, username, role);
        return token;
    }
    async captcha(size) {
        return await this.authService.getCaptcha(size);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, authorize_decorator_1.Authorize)(),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle({ message: 'Login', error: common_1.HttpStatus.BAD_REQUEST }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.AuthUserInfoPayload]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('refreshToken'),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle({ message: 'Refresh token' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Get)('captcha/img'),
    (0, authorize_decorator_1.Authorize)(),
    (0, permission_optional_decorator_1.PermissionOptional)(),
    http_decorator_1.HttpProcessor.handle({
        message: 'Captcha',
        error: common_1.HttpStatus.BAD_REQUEST,
        success: common_1.HttpStatus.CREATED,
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_model_1.ImageCaptchaPayload]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "captcha", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map