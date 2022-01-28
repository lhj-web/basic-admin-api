/**
 * @file 401 HttpUnauthorized error
 * @module error/unauthorized
 * @author Name6
 */

import { UnauthorizedException } from '@nestjs/common';
import { ResponseMessage } from '@/interfaces/http.interface';
import * as TEXT from '@/constants/text.constant';

/**
 * @class HttpUnauthorizedError
 * @classdesc 401 -> 未授权/权限验证失败
 * @example new HttpUnauthorizedError('全新验证失败')
 * @example new HttpUnauthorizedError('错误信息', new Error())
 */
export class HttpUnauthorizedError extends UnauthorizedException {
  constructor(message?: ResponseMessage, error?: any) {
    super(message || TEXT.HTTP_UNAUTHORIZED_TEXT_DEFAULT, error);
  }
}
