/**
 * @file User model
 * @module modules/user/model
 * @author Name6
 */

import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { prop, modelOptions, plugin } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from '@/common/transformers/model.transformer';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { generalAutoIncrementIDConfig } from '@/constants/increment.constant';
import { decodeMD5 } from '@/common/transformers/codec.transformer';
import { mongoosePaginate } from '@/utils/paginate';

@plugin(mongoosePaginate)
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

  @IsDefined()
  @IsInt()
  @prop({ required: true })
  role: number;

  @IsOptional()
  @IsString()
  @prop({ default: '' })
  nickname?: string;

  @IsOptional()
  @IsString({ message: 'desc' })
  @prop({ default: '' })
  desc?: string;

  @IsOptional()
  @IsString()
  @prop({
    default:
      'https://my-picture-bed-1304169582.cos.ap-nanjing.myqcloud.com/picture/user.jpg',
  })
  avatar?: string;

  @IsOptional()
  @IsString()
  @prop({ default: decodeMD5('123456') })
  password: string;

  @prop({ default: Date.now, immutable: true })
  create_at?: Date;

  @prop({ default: Date.now })
  update_at?: Date;

  @IsOptional()
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
