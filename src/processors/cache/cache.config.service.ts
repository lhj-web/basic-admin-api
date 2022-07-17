/**
 * @file Cache config service
 * @module processor/cache/config.service
 * @author Name6
 */

import type { CacheOptionsFactory } from '@nestjs/common';
import type { CacheStoreOptions, RedisStoreOptions } from './cache.store';
import { Injectable } from '@nestjs/common';
import lodash from 'lodash';
import { EmailService } from '@/processors/helper/email.service';
import * as APP_CONFIG from '@/app.config';
import logger from '@/utils/logger';
import redisStore from './cache.store';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly emailService: EmailService) {}

  // 发送告警邮件（半分钟节流）
  private sendAlarmMail = lodash.throttle((error: string) => {
    this.emailService.sendMailAs(APP_CONFIG.APP.NAME, {
      to: APP_CONFIG.APP.ADMIN_EMAIL,
      subject: 'Redis Error!',
      text: error,
      html: `<pre><code>${error}</code></pre>`,
    });
  }, 1000 * 30);

  // 重试策略
  public retryStrategy(retries: number): number | Error {
    // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md#reconnect-strategy
    const errorMessage = ['[Redis]', `retryStrategy！retries: ${retries}`];
    logger.error(...(errorMessage as [any]));
    this.sendAlarmMail(errorMessage.join(''));

    if (retries > 6)
      return new Error('[Redis] 尝试次数已达极限！');

    return Math.min(retries * 1000, 3000);
  }

  // 缓存配置
  public createCacheOptions(): CacheStoreOptions {
    // https://github.com/redis/node-redis/blob/master/docs/client-configuration.md
    const redisOptions: RedisStoreOptions = {
      socket: {
        host: APP_CONFIG.REDIS.host as string,
        port: APP_CONFIG.REDIS.port as number,
        reconnectStrategy: this.retryStrategy.bind(this),
      },
    };
    if (APP_CONFIG.REDIS.username)
      redisOptions.username = APP_CONFIG.REDIS.username;

    if (APP_CONFIG.REDIS.password)
      redisOptions.password = APP_CONFIG.REDIS.password;

    return {
      isGlobal: true,
      store: redisStore,
      redisOptions,
    };
  }
}
