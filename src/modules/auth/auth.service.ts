/**
 * @file Auth service
 * @module modules/auth/servcie
 * @author Name6
 */

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import lodash from 'lodash';
import { Auth } from './auth.model';
import { UNDEFINED } from '@/constants/value.constant';
import { MongooseModel } from '@/interfaces/mongoose.interface';
import { InjectModel } from '@/common/transformers/model.transformer';
import { decodeMD5 } from '@/common/transformers/codec.transformer';
import * as APP_CONFIG from '@/app.config';
import { TokenResult } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(Auth) private readonly authModel: MongooseModel<Auth>,
  ) {}

  public createToken(): TokenResult {
    return {
      access_token: this.jwtService.sign({ data: APP_CONFIG.AUTH.data }),
      expires_in: APP_CONFIG.AUTH.expiresIn as number,
    };
  }

  public validateAuthData(payload: any): Promise<any> {
    const isVerified = lodash.isEqual(payload.data, APP_CONFIG.AUTH.data);
    return isVerified ? payload.data : null;
  }

  public async getAdminInfo(): Promise<Auth> {
    const adminInfo = await this.authModel.findOne(UNDEFINED, '-_id').exec();
    if (!adminInfo) throw 'this user is not exist';
    return adminInfo.toObject();
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

  public async adminLogin(username: string, password: string): Promise<TokenResult> {
    const auth = await this.authModel.findOne({ username }, { password: 1 }).exec();

    if (auth === null) throw 'User is not exist';
    const existedPassword = auth.password;
    const loginPassword = decodeMD5(password);

    if (loginPassword === existedPassword) return this.createToken();
    else throw 'Password incorrect';
  }
}
