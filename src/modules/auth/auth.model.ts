/**
 * @file Auth & admin model
 * @module modules/auth/model
 * @author Name6
 */

import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AuthUserInfoPayload {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
    username: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
    password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
    captchaId: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
    verifyCode: string;
}

export class ImageCaptchaPayload {
  @IsOptional()
  @IsNumber()
  readonly width = 100;

  @IsOptional()
  @IsNumber()
  readonly height = 50;
}
