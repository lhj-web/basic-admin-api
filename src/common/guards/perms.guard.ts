/**
 * @file Permission guard
 * @module guards/perms
 * @author Name6
 */

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { PERMISSION_OPTIONAL_KEY_METADATA } from '@/constants/meta.constant';
import { HttpForbiddenError } from '@/errors/forbidden.error';
import { RequestUser } from '@/interfaces/req-user.interface';
import { RoleService } from '@/modules/role/role.service';

@Injectable()
export class PermsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const notNeedPerm = this.reflector.get<boolean>(
      PERMISSION_OPTIONAL_KEY_METADATA,
      context.getHandler(),
    );
    if (notNeedPerm === true)
      return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user as RequestUser;
    const { role } = user;
    const path = req.url.split('?')[0].replace(/\//, '');

    const roleService = this.moduleRef.get(RoleService, { strict: false });
    const perms = await roleService.getMenuPerms(role);
    if (!perms.length)
      throw new HttpForbiddenError();
    if (perms.includes(path.replace(/\//g, ':')))
      return true;
    else throw new HttpForbiddenError();
  }
}
