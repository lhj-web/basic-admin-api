/**
 * @file Auth service
 * @module modules/auth/servcie
 * @author Name6
 */

import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decodeMD5 } from '@/common/transformers/codec.transformer';
import { nanoid } from 'nanoid';
import * as svgCaptcha from 'svg-captcha';
import * as APP_CONFIG from '@/app.config';
import { TokenResult } from './auth.interface';
import { UserService } from '../user/user.service';
import { CacheService } from '@/processors/cache/cache.service';
import { ImageCaptchaPayload } from './auth.model';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly cacheService: CacheService,
  ) {}

  public createToken(id: number, username: string, role: number): TokenResult {
    return {
      access_token: this.jwtService.sign({ id, username, role }),
      refresh_token: this.jwtService.sign(
        { id, username, role },
        { expiresIn: APP_CONFIG.AUTH.refreshExpiresIn as number },
      ),
    };
  }

  public validateAuthData(payload: any): Promise<any> {
    return payload.id && payload.username ? payload : null;
  }

  public async adminLogin(
    username: string,
    password: string,
  ): Promise<TokenResult & { user_id: number }> {
    const user = await this.userService.findOne({ username });
    if (user === null) throw 'User is not exist';
    if (user.status === false) throw '该用户已被禁用';
    const existedPassword = user.password;
    const loginPassword = decodeMD5(password);

    if (loginPassword === existedPassword) {
      const token = this.createToken(user.id, user.username, user.role);
      return { ...token, user_id: user.id };
    } else throw 'Password incorrect';
  }

  /**
   * 获取验证码
   * @param size img size
   * @returns img + id
   */
  public async getCaptcha(size: ImageCaptchaPayload) {
    const svg = svgCaptcha.create({
      size: 4,
      color: true,
      noise: 4,
      width: isEmpty(size.width) ? 100 : size.width,
      height: isEmpty(size.height) ? 50 : size.height,
      charPreset: '1234567890',
    });
    const ret = {
      img: `data:image/svg+xml;base64,${Buffer.from(svg.data).toString('base64')}`,
      id: nanoid(),
    };
    await this.cacheService.set(`admin:captcha:img:${ret.id}`, svg.text, { ttl: 5 * 60 });
    return ret;
  }

  public async checkCaptcha(id: string, code: string): Promise<void> {
    const ret = await this.cacheService.get<string>(`admin:captcha:img:${id}`);
    if (isEmpty(ret) || code.toLowerCase() !== ret.toLowerCase()) {
      throw '验证码错误';
    }
    await this.cacheService.delete(`admin:captcha:img:${id}`);
  }
}
