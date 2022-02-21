/**
 * @file App module
 * @module app/module
 * @author Name6
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './processors/database/database.module';
import { HelperModule } from './processors/helper/helper.module';
import { UserModule } from './modules/user/user.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';
import { ResourceModule } from './modules/resource/resource.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { PermsGuard } from './common/guards/perms.guard';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    HelperModule,
    UserModule,
    MenuModule,
    RoleModule,
    ResourceModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermsGuard,
    },
  ],
})
export class AppModule {}
