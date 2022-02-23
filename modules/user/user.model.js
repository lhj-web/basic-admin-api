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
exports.UserProvider = exports.UserInfo = exports.User = void 0;
const class_validator_1 = require("class-validator");
const typegoose_1 = require("@typegoose/typegoose");
const model_transformer_1 = require("../../common/transformers/model.transformer");
const auto_increment_1 = require("@typegoose/auto-increment");
const increment_constant_1 = require("../../constants/increment.constant");
const codec_transformer_1 = require("../../common/transformers/codec.transformer");
const paginate_1 = require("../../utils/paginate");
let User = class User {
};
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)({ message: `what's your name?` }),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'desc' }),
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "desc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({
        default: 'https://my-picture-bed-1304169582.cos.ap-nanjing.myqcloud.com/picture/user.jpg',
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({ default: (0, codec_transformer_1.decodeMD5)('123456') }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now, immutable: true }),
    __metadata("design:type", Date)
], User.prototype, "create_at", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], User.prototype, "update_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "status", void 0);
User = __decorate([
    (0, typegoose_1.plugin)(paginate_1.mongoosePaginate),
    (0, typegoose_1.plugin)(auto_increment_1.AutoIncrementID, increment_constant_1.generalAutoIncrementIDConfig),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            versionKey: false,
            timestamps: {
                createdAt: 'create_at',
                updatedAt: 'update_at',
            },
        },
    })
], User);
exports.User = User;
class UserInfo {
}
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'hi' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfo.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'hello' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserInfo.prototype, "password", void 0);
exports.UserInfo = UserInfo;
exports.UserProvider = (0, model_transformer_1.getProviderByTypegooseClass)(User);
//# sourceMappingURL=user.model.js.map