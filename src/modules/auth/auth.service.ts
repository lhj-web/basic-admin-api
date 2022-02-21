/**
 * @file Auth service
 * @module modules/auth/servcie
 * @author Name6
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { decodeMD5 } from '@/common/transformers/codec.transformer';
import * as APP_CONFIG from '@/app.config';
import { TokenResult } from './auth.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
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
}
