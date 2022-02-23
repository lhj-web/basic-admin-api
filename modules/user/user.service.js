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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const model_transformer_1 = require("../../common/transformers/model.transformer");
const user_model_1 = require("./user.model");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(info) {
        const user = await this.userModel.findOne(info).exec();
        if (!user)
            throw 'The user is not exist';
        return user;
    }
    async createOne(user) {
        await this.userModel.create(user);
    }
    getUserList(query, options) {
        options.select = { _id: 0, password: 0, update_at: 0 };
        return this.userModel.paginate(query, options);
    }
    async updateOne(id, data) {
        await this.userModel.updateOne({ id }, Object.assign({}, data)).exec();
    }
    async isUserExist(username) {
        const user = await this.userModel.findOne({ username }).exec();
        if (user)
            return user.id;
        return false;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, model_transformer_1.InjectModel)(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map