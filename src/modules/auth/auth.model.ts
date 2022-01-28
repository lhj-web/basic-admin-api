/**
 * @file Auth & admin model
 * @module modules/auth/model
 * @author Name6
 */

import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { prop, modelOptions } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from '@/common/transformers/model.transformer';

@modelOptions({
  schemaOptions: {
    versionKey: false,
  },
})
export class Auth {
  @IsDefined()
  @IsString({ message: `what's your name?` })
  @prop({ required: true })
  username: string;

  @IsOptional()
  @IsString({ message: 'desc' })
  @prop({ default: '' })
  desc: string;

  @IsOptional()
  @IsString()
  @prop({ default: '' })
  avatar: string;

  @IsDefined()
  @IsString()
  @prop({ required: true })
  password: string;
}

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

export const AuthProvider = getProviderByTypegooseClass(Auth);
