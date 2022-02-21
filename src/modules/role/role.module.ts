import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleProvider } from './role.model';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [MenuModule],
  controllers: [RoleController],
  providers: [RoleService, RoleProvider],
  exports: [RoleService],
})
export class RoleModule {}
