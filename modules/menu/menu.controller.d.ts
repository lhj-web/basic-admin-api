import { MenuService } from './menu.service';
import { MenuInfo } from './menu.model';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    add(body: MenuInfo): boolean;
    list(query: any): Promise<any[]>;
    update(menu: MenuInfo): boolean;
    delete({ id }: {
        id: any;
    }): boolean;
}
