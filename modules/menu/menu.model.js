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
exports.MenuProvider = exports.MenuInfo = exports.Menu = void 0;
const class_validator_1 = require("class-validator");
const typegoose_1 = require("@typegoose/typegoose");
const model_transformer_1 = require("../../common/transformers/model.transformer");
const auto_increment_1 = require("@typegoose/auto-increment");
const increment_constant_1 = require("../../constants/increment.constant");
const menu_enum_1 = require("./menu.enum");
let Menu = class Menu {
};
__decorate([
    (0, typegoose_1.prop)({ unique: true }),
    __metadata("design:type", Number)
], Menu.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Number)
], Menu.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Menu.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "route", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "component", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "perms", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsIn)([menu_enum_1.MenuType.directory, menu_enum_1.MenuType.menu, menu_enum_1.MenuType.button]),
    (0, class_validator_1.IsInt)({ message: 'The type field should be a number: 0, 1 or 2' }),
    (0, typegoose_1.prop)({ enum: menu_enum_1.MenuType, default: menu_enum_1.MenuType.directory, index: true }),
    __metadata("design:type", Number)
], Menu.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Menu.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Menu.prototype, "order_num", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Menu.prototype, "keepalive", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now, immutable: true }),
    __metadata("design:type", Date)
], Menu.prototype, "create_at", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Menu.prototype, "update_at", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Menu.prototype, "status", void 0);
Menu = __decorate([
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
], Menu);
exports.Menu = Menu;
class MenuInfo {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], MenuInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], MenuInfo.prototype, "parent_id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MenuInfo.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuInfo.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MenuInfo.prototype, "keepalive", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], MenuInfo.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuInfo.prototype, "component", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuInfo.prototype, "icon", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuInfo.prototype, "route", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MenuInfo.prototype, "perms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MenuInfo.prototype, "is_ext", void 0);
exports.MenuInfo = MenuInfo;
exports.MenuProvider = (0, model_transformer_1.getProviderByTypegooseClass)(Menu);
//# sourceMappingURL=menu.model.js.map