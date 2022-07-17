import type { MongooseModel } from '@/interfaces/mongoose.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@/common/transformers/model.transformer';
import { MenuType } from './menu.enum';
import { Menu, MenuInfo } from './menu.model';

@Injectable()
export class MenuService {
  constructor(@InjectModel(Menu) private readonly menuModel: MongooseModel<Menu>) {}

  /**
   * 添加菜单
   * @param menu
   */
  addOne(menu: MenuInfo) {
    if (menu.type === 1 && menu.component?.[0] !== '/')
      menu.component = `/${menu.component}`;

    if (!menu.parent_id && menu.route?.[0] !== '/')
      menu.route = `/${menu.route}`;

    this.menuModel.create(menu);
  }

  updateOne(menu: MenuInfo) {
    if (!menu.id)
      throw new Error('id不存在');
    if (menu.type === 1 && menu.component?.[0] !== '/')
      menu.component = `/${menu.component}`;

    if (!menu.parent_id && menu.route?.[0] !== '/')
      menu.route = `/${menu.route}`;

    this.menuModel.updateOne({ id: menu.id }, menu).exec();
  }

  deleteOne(id: number) {
    if (!id)
      throw new Error('id不存在');
    this.menuModel.deleteOne({ id }).exec();
  }

  /**
   * 获取所有菜单
   */
  async getAllMenu(query) {
    const menus = await this.menuModel.find(query, { _id: false }).exec();
    const map = new Map();
    menus.forEach(menu => {
      if (menu.type !== MenuType.button)
      // @ts-expect-error
        menu._doc.children = [];
      if (menu.status === false)
        // @ts-expect-error
        menu._doc.disabled = true;
      map.set(menu.id, menu);
    });
    const newMenus: any[] = [];
    for (const menu of menus) {
      const parent = map.get(menu.parent_id);
      if (parent)
        parent._doc.children.push(menu);
      else newMenus.push(menu);
    }

    return newMenus;
  }

  /**
   * 获取指定id的菜单
   * @param ids menu id
   * @returns Menu[]
   */
  getMenuList(ids: number[]) {
    const menus = this.menuModel
      .find({ id: { $in: ids }, type: { $in: [0, 1] }, status: true }, { _id: false })
      .exec();
    return menus;
  }

  /**
   * 获取当前用户的所有权限
   * @param ids: menu id
   * @returns string[]
   */
  async getPerms(ids: number[]): Promise<string[]> {
    const menus: Menu[] = await this.menuModel.find({ id: { $in: ids }, type: 2 }).exec();
    if (!menus.length)
      return [];
    const perms = menus.map(menu => menu.perms as string);
    return perms;
  }
}
