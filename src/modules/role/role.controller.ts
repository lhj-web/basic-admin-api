import { HttpProcessor } from '@/common/decorators/http.decorator';
import { PermissionOptional } from '@/common/decorators/permission-optional.decorator';
import { QueryParams } from '@/common/decorators/query-params.decorator';
import { ReqUser } from '@/common/decorators/req-user.decorator';
import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req } from '@nestjs/common';
import { RoleInfo } from './role.model';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('list')
  @PermissionOptional()
  @HttpProcessor.handle({ message: 'Get role list' })
  async list() {
    return await this.roleService.getList();
  }

  @Get('all')
  @PermissionOptional()
  @HttpProcessor.handle('Get role list')
  async roleList(@QueryParams() { options, origin }) {
    const { name } = origin;
    const query = {};
    if (name) query['name'] = name;
    const roles = await this.roleService.paginator(query, options);
    return roles;
  }

  @Post('add')
  @HttpProcessor.handle({
    message: 'Add role',
    success: HttpStatus.CREATED,
    error: HttpStatus.BAD_REQUEST,
  })
  add(@Body() body: RoleInfo, @Req() req) {
    const user_id = req.user.id as number;
    this.roleService.createOne({ ...body, user_id });
    return true;
  }

  @Put('update')
  @HttpProcessor.handle({ message: 'Update role', error: HttpStatus.BAD_REQUEST })
  update(@Body() body: RoleInfo, @Req() req) {
    const user_id = req.user.id as number;
    this.roleService.updateOne({ ...body, user_id });
    return true;
  }

  @Get('menu')
  @PermissionOptional()
  @HttpProcessor.handle({ message: 'Get menu' })
  async getMenus(@ReqUser('role') id: number) {
    const menus = await this.roleService.getMenus(id);
    return menus;
  }

  @Get('perms')
  @PermissionOptional()
  async getPerms(@ReqUser('role') id: number) {
    const perms = await this.roleService.getMenuPerms(id);
    return perms;
  }

  @Delete('delete')
  @HttpProcessor.handle('Delete role')
  delete(@Body() body) {
    this.roleService.deleteOne(body.id);
    return true;
  }
}
