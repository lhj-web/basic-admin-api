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

  public createToken(id: number, username: string): TokenResult {
    return {
      access_token: this.jwtService.sign({ id, username }),
      refresh_token: this.jwtService.sign(
        { id, username },
        { expiresIn: APP_CONFIG.AUTH.refreshExpiresIn as number },
      ),
    };
  }

  public validateAuthData(payload: any): Promise<any> {
    return payload.id && payload.username ? payload : null;
  }

  // public async putAdminInfo(auth: Auth): Promise<Auth> {
  //   const { password, new_password, ...restAuth } = auth;

  //   let newPassword: string | void;
  //   if (password || new_password) {
  //     if (!password || !new_password) throw 'Incomplete passwords';
  //     if (password === new_password) throw 'Old password and new password cannot be same';
  //     const oldPassword = decodeMD5(decodeBase64(password));
  //     const existedPassword = await this.getExistedPassword();
  //     if (oldPassword !== existedPassword) throw 'Old password incorrect';
  //     else newPassword = decodeMD5(decodeBase64(new_password));
  //   }

  //   const targetAuthData: Auth = { ...restAuth };
  //   if (newPassword) targetAuthData.password = newPassword;

  //   const existedAuth = await this.authModel.findOne(UNDEFINED, '+password').exec();
  //   if (existedAuth) await Object.assign(existedAuth, targetAuthData).save();
  //   else await this.authModel.create(targetAuthData);

  //   return this.getAdminInfo();
  // }

  public async adminLogin(
    username: string,
    password: string,
  ): Promise<TokenResult & { user_id: number }> {
    const user = await this.userService.findOne({ username });
    if (user === null) throw 'User is not exist';
    const existedPassword = user.password;
    const loginPassword = decodeMD5(password);

    if (loginPassword === existedPassword) {
      const token = this.createToken(user.id, user.username);
      return { ...token, user_id: user.id };
    } else throw 'Password incorrect';
  }
}
