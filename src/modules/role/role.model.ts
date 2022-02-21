/**
 * @file Menu model
 * @module modules/menu/model
 * @author Name6
 */

import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { prop, modelOptions, plugin } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from '@/common/transformers/model.transformer';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { generalAutoIncrementIDConfig } from '@/constants/increment.constant';
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
export class Role {
  @prop({ unique: true })
  id: number;

  @IsDefined()
  @IsString()
  @prop({ required: true })
  name: string;

  @IsDefined()
  @IsNumber()
  @prop({ required: true })
  user_id: number;

  @IsDefined()
  @IsString()
  @prop({ unique: true })
  label: string;

  @IsDefined()
  @IsBoolean()
  @prop({ default: true })
  status: boolean;

  @IsDefined()
  @IsArray()
  @ArrayUnique()
  @prop({ type: () => [Number] })
  menus: number[];

  @IsOptional()
  @IsString({ message: 'desc' })
  @prop({ default: '' })
  desc?: string;

  @prop({ default: Date.now, immutable: true })
  create_at?: Date;

  @prop({ default: Date.now })
  update_at?: Date;
}

export class RoleInfo {
  @IsOptional()
  @IsInt()
  id: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsDefined()
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;

  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  menus: number[];

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @IsInt()
  user_id?: number;
}

export const RoleProvider = getProviderByTypegooseClass(Role);
