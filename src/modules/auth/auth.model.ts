/**
 * @file Auth & admin model
 * @module modules/auth/model
 * @author Name6
 */

import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserInfoPayload {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
