"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorize = void 0;
const common_1 = require("@nestjs/common");
const meta_constant_1 = require("../../constants/meta.constant");
const Authorize = () => (0, common_1.SetMetadata)(meta_constant_1.AUTHORIZE_KEY_METADATA, true);
exports.Authorize = Authorize;
//# sourceMappingURL=authorize.decorator.js.map