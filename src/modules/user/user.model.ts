/**
 * @file User model
 * @module modules/user/model
 * @author Name6
 */

import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { prop, modelOptions, plugin } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from '@/common/transformers/model.transformer';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { generalAutoIncrementIDConfig } from '@/constants/increment.constant';

@plugin(AutoIncrementID, generalAutoIncrementIDConfig)
@modelOptions({
  schemaOptions: {
    versionKey: false,
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
})
export class User {
  @prop({ unique: true })
  id: number;

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

  @prop({ default: Date.now, immutable: true })
  create_at?: Date;

  @prop({ default: Date.now })
  update_at?: Date;

  @IsDefined()
  @IsBoolean()
  @prop({ default: true })
  status: boolean;
}

export class UserInfo {
  @IsDefined()
  @IsNotEmpty({ message: 'hi' })
  @IsString()
  username: string;

  @IsDefined()
  @IsNotEmpty({ message: 'hello' })
  @IsString()
  password: string;

  avatar?: string;

  desc?: string;
}

export const UserProvider = getProviderByTypegooseClass(User);
