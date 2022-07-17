/**
 * @file Database module
 * @module processor/database/module
 * @author Name6
 */

import { Global, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';

@Global()
@Module({
  providers: [databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
