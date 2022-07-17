/**
 * @file Get request user
 * @module /decorators/req-user
 * @author Name6
 */

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { RequestUser } from '@/interfaces/req-user.interface';

export const ReqUser = createParamDecorator(
  (data: 'id' | 'username' | 'role', context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as RequestUser;
    return data ? user[data] : user;
  },
);
