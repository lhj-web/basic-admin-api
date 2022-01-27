import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './processors/database/database.module';
import { HelperModule } from './processors/helper/helper.module';

@Module({
  imports: [DatabaseModule, AuthModule, HelperModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
