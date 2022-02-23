"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryParams = exports.QueryParamsField = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const text_constant_1 = require("../../constants/text.constant");
const forbidden_error_1 = require("../../errors/forbidden.error");
const bad_request_error_1 = require("../../errors/bad-request.error");
var QueryParamsField;
(function (QueryParamsField) {
    QueryParamsField["Page"] = "page";
    QueryParamsField["PageSize"] = "pageSize";
    QueryParamsField["Sort"] = "sort";
    QueryParamsField["Date"] = "_t";
    QueryParamsField["State"] = "state";
    QueryParamsField["Origin"] = "origin";
    QueryParamsField["ParamsId"] = "paramsId";
})(QueryParamsField = exports.QueryParamsField || (exports.QueryParamsField = {}));
exports.QueryParams = (0, common_1.createParamDecorator)((customConfig, context) => {
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated();
    const transformConfig = {
        [QueryParamsField.Page]: 1,
        [QueryParamsField.PageSize]: 10,
        [QueryParamsField.ParamsId]: 'id',
        [QueryParamsField.Sort]: true,
    };
    if (customConfig) {
        customConfig.forEach((field) => {
            if (lodash_1.default.isString(field)) {
                transformConfig[field] = true;
            }
            if (lodash_1.default.isObject(field)) {
                Object.assign(transformConfig, field);
            }
        });
    }
    const querys = {};
    const options = {};
    const params = lodash_1.default.merge({ url: request.url }, request.params);
    const date = request.query._t;
    const paramsId = request.params[transformConfig.paramsId];
    const [page, pageSize] = [
        request.query.page || transformConfig.page,
        request.query.pageSize || transformConfig.pageSize,
    ].map((item) => (item != null ? Number(item) : item));
    const validates = [
        {
            name: 'params.id',
            field: QueryParamsField.ParamsId,
            isAllowed: true,
            isIllegal: paramsId != null && !isAuthenticated && (0, mongoose_1.isValidObjectId)(paramsId),
            setValue() {
                if (paramsId != null) {
                    params[transformConfig.paramsId] =
                        (0, mongoose_1.isValidObjectId)(paramsId)
                            ? new mongoose_1.Types.ObjectId(paramsId)
                            : isNaN(paramsId)
                                ?
                                    String(paramsId)
                                :
                                    Number(paramsId);
                }
            },
        },
        {
            name: 'query.page',
            field: QueryParamsField.Page,
            isAllowed: lodash_1.default.isUndefined(page) || (lodash_1.default.isInteger(page) && Number(page) > 0),
            isIllegal: false,
            setValue() {
                if (page != null) {
                    options.page = page;
                }
            },
        },
        {
            name: 'query.pageSize',
            field: QueryParamsField.PageSize,
            isAllowed: lodash_1.default.isUndefined(pageSize) ||
                (lodash_1.default.isInteger(pageSize) && Number(pageSize) > 0 && Number(pageSize) <= 50),
            isIllegal: false,
            setValue() {
                if (pageSize != null) {
                    options.PageSize = pageSize;
                }
            },
        },
        {
            name: 'query.date',
            field: QueryParamsField.Date,
            isAllowed: lodash_1.default.isUndefined(date) ||
                new Date(Number(date)).toString() !== 'Invalid Date',
            isIllegal: false,
            setValue() {
                if (date !== null) {
                    const queryDate = new Date(Number(date)).toString();
                    querys.create_at = queryDate;
                }
            },
        },
    ];
    const isEnabledField = (field) => field != null && field !== false;
    validates.forEach((validate) => {
        if (!isEnabledField(transformConfig[validate.field])) {
            return false;
        }
        if (!validate.isAllowed) {
            throw new bad_request_error_1.HttpBadRequestError(`${text_constant_1.VALIDATION_ERROR_DEFAULT}: ${validate.name}`);
        }
        if (validate.isIllegal) {
            throw new forbidden_error_1.HttpForbiddenError(`${text_constant_1.HTTP_PARAMS_PERMISSION_ERROR_DEFAULT}: ${validate.name}`);
        }
        validate.setValue();
    });
    const isProcessedFields = validates.map((validate) => validate.field);
    const allAllowFields = Object.keys(transformConfig);
    const todoFields = lodash_1.default.difference(allAllowFields, isProcessedFields);
    todoFields.forEach((field) => {
        const targetValue = request.query[field];
        if (targetValue != null)
            querys[field] = targetValue;
    });
    request.queryParams = { querys, options, params, isAuthenticated };
    const ip = request.headers['x-forwarded-for'] ||
        request.headers['x-real-ip'] ||
        request.socket.remoteAddress ||
        request.ip ||
        request.ips[0];
    return {
        isAuthenticated,
        querys,
        options,
        params,
        request,
        user: request.user,
        origin: request.query,
        cookies: request.cookies,
        visitor: {
            ip: ip.replace('::ffff:', '').replace('::1', ''),
            ua: request.headers['user-agent'],
            referer: request.referer,
        },
    };
});
//# sourceMappingURL=query-params.decorator.js.map