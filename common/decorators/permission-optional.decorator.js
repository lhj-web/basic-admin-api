"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionOptional = void 0;
const common_1 = require("@nestjs/common");
const meta_constant_1 = require("../../constants/meta.constant");
const PermissionOptional = () => (0, common_1.SetMetadata)(meta_constant_1.PERMISSION_OPTIONAL_KEY_METADATA, true);
exports.PermissionOptional = PermissionOptional;
//# sourceMappingURL=permission-optional.decorator.js.map