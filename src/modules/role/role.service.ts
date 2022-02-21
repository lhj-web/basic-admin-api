import { InjectModel } from '@/common/transformers/model.transformer';
import { MongooseModel } from '@/interfaces/mongoose.interface';
import { PaginateOptions } from '@/utils/paginate';
import { Injectable } from '@nestjs/common';
import { MenuService } from '../menu/menu.service';
import { Role, RoleInfo } from './role.model';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role) private readonly roleModel: MongooseModel<Role>,
    private readonly menuService: MenuService,
  ) {}

  async getList() {
    const roles = this.roleModel.find({}, { menus: false, _id: false }).exec();
    return roles;
  }

  paginator(query, options: PaginateOptions) {
    options.select = { _id: 0, update_at: 0 };
    return this.roleModel.paginate(query, options);
  }

  /**
   * find role by role_id
   */
  async findRoleById(id: number): Promise<Role> {
    const role = await this.roleModel.findOne({ id }).exec();
    if (!role) throw '该角色不存在!';
    return role;
  }

  async createOne(role: RoleInfo) {
    const info = await this.roleModel.findOne({ label: role.label });
    if (info) throw 'The role has existed';
    this.roleModel.create(role);
  }

  async updateOne(role: RoleInfo) {
    const info = await this.roleModel.findOne({ label: role.label }).exec();
    if (info && info.id !== Number(role.id)) throw 'The role has existed';
    this.roleModel
      .updateOne({ label: role.label }, { ...role, id: Number(role.id) })
      .exec();
  }

  deleteOne(id: number) {
    if (!id) throw 'id不存在';
    this.roleModel.deleteOne({ id }).exec();
  }

  /**
   * 获取角色权限
   * @param id role_id
   * @return string[]
   */
  async getMenuPerms(id: number) {
    const role = await this.findRoleById(id);
    const perms = await this.menuService.getPerms(role.menus);
    return perms;
  }

  /**
   * 获取角色菜单
   * @param id role_id
   */
  async getMenus(id: number) {
    const role = await this.findRoleById(id);
    const menus = await this.menuService.getMenuList(role.menus);
    const newMenus = menus.map((menu) => {
      const { name, route, parent_id, component, icon, id, keepalive, order_num } = menu;
      return {
        id,
        path: route as string,
        name: route?.replace(/\//g, '').toUpperCase(),
        parent_id,
        component,
        meta: {
          title: name,
          icon,
          ignoreKeepAlive: !keepalive,
          orderNo: order_num,
        },
        children: [],
      };
    });
    const map = new Map();
    newMenus.forEach((menu) => {
      map.set(menu.id, menu);
    });
    const routes: any[] = [];
    for (const menu of newMenus) {
      const parent = map.get(menu.parent_id);
      if (parent) parent.children.push(menu);
      else routes.push(menu);
    }
    for (const route of routes) {
      route.redirect = returnPath(route);
      remomvePro(route);
    }

    /**
     * 生成每个路由的redirect属性
     * @param route 路由对象
     * @returns string
     */
    function returnPath(route) {
      if (!route.children[0]) {
        return route.path;
      }
      return route.path + `/${returnPath(route.children[0])}`;
    }

    /**
     * 移除id、parent_id以及菜单的children属性
     * @param route
     * @returns
     */
    function remomvePro(route) {
      if (route.children.length) {
        for (const child of route.children) {
          remomvePro(child);
        }
      } else {
        delete route.children;
      }
      delete route.id;
      delete route.parent_id;
      return;
    }
    return routes;
  }
}
