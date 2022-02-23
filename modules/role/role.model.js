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
exports.RoleProvider = exports.RoleInfo = exports.Role = void 0;
const class_validator_1 = require("class-validator");
const typegoose_1 = require("@typegoose/typegoose");
const model_transformer_1 = require("../../common/transformers/model.transformer");
const auto_increment_1 = require("@typegoose/auto-increment");
const increment_constant_1 = require("../../constants/increment.constant");
const paginate_1 = require("../../utils/paginate");
let Role = class Role {
};
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNumber)(),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Role.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", String)
], Role.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Role.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, typegoose_1.prop)({ type: () => [Number] }),
    __metadata("design:type", Array)
], Role.prototype, "menus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'desc' }),
    (0, typegoose_1.prop)({ default: '' }),
    __metadata("design:type", String)
], Role.prototype, "desc", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now, immutable: true }),
    __metadata("design:type", Date)
], Role.prototype, "create_at", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Role.prototype, "update_at", void 0);
Role = __decorate([
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
], Role);
exports.Role = Role;
class RoleInfo {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RoleInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleInfo.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleInfo.prototype, "label", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], RoleInfo.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    __metadata("design:type", Array)
], RoleInfo.prototype, "menus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleInfo.prototype, "desc", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RoleInfo.prototype, "user_id", void 0);
exports.RoleInfo = RoleInfo;
exports.RoleProvider = (0, model_transformer_1.getProviderByTypegooseClass)(Role);
//# sourceMappingURL=role.model.js.map