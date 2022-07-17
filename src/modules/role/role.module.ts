import { Module } from '@nestjs/common';
import { MenuModule } from '../menu/menu.module';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleProvider } from './role.model';

@Module({
  imports: [MenuModule],
  controllers: [RoleController],
  providers: [RoleService, RoleProvider],
  exports: [RoleService],
})
export class RoleModule {}
