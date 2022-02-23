"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const codec_transformer_1 = require("../../common/transformers/codec.transformer");
const APP_CONFIG = __importStar(require("../../app.config"));
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    createToken(id, username, role) {
        return {
            access_token: this.jwtService.sign({ id, username, role }),
            refresh_token: this.jwtService.sign({ id, username, role }, { expiresIn: APP_CONFIG.AUTH.refreshExpiresIn }),
        };
    }
    validateAuthData(payload) {
        return payload.id && payload.username ? payload : null;
    }
    async adminLogin(username, password) {
        const user = await this.userService.findOne({ username });
        if (user === null)
            throw 'User is not exist';
        if (user.status === false)
            throw '该用户已被禁用';
        const existedPassword = user.password;
        const loginPassword = (0, codec_transformer_1.decodeMD5)(password);
        if (loginPassword === existedPassword) {
            const token = this.createToken(user.id, user.username, user.role);
            return Object.assign(Object.assign({}, token), { user_id: user.id });
        }
        else
            throw 'Password incorrect';
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map