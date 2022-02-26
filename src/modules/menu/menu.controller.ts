import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { HttpProcessor } from '@/common/decorators/http.decorator';
import { MenuInfo } from './menu.model';
import { PermissionOptional } from '@/common/decorators/permission-optional.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  @PermissionOptional()
  @HttpProcessor.handle({
    message: 'Add menu',
    success: HttpStatus.CREATED,
    error: HttpStatus.BAD_REQUEST,
  })
  add(@Body() body: MenuInfo) {
    // this.menuService.addOne(body);
    return true;
  }

  @Get('all')
  @PermissionOptional()
  @HttpProcessor.handle('Get menu list')
  async list(@Query() query) {
    const { name, status } = query;
    const info = {};
    if (name) info['name'] = name;
    if (status === '0') info['status'] = false;
    else if (status === '1') info['status'] = true;
    return await this.menuService.getAllMenu(info);
  }

  @Put('update')
  @HttpProcessor.handle({ message: 'Update menu', error: HttpStatus.BAD_REQUEST })
  update(@Body() menu: MenuInfo) {
    // this.menuService.updateOne(menu);
    return true;
  }

  @Delete('delete')
  @HttpProcessor.handle({ message: 'Delete menu', error: HttpStatus.BAD_REQUEST })
  delete(@Body() { id }) {
    // this.menuService.deleteOne(id);
    return true;
  }
}
