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

@Module({
  imports: [DatabaseModule, AuthModule, HelperModule, UserModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
