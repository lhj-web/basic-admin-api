import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuProvider } from './menu.model';

@Module({
  controllers: [MenuController],
  providers: [MenuService, MenuProvider],
  exports: [MenuService],
})
export class MenuModule {}
