/**
 * @file Menu model
 * @module modules/menu/model
 * @author Name6
 */

import {
  IsBoolean,
  IsDefined,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { modelOptions, plugin, prop } from '@typegoose/typegoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { getProviderByTypegooseClass } from '@/common/transformers/model.transformer';
import { generalAutoIncrementIDConfig } from '@/constants/increment.constant';
import { MenuType } from './menu.enum';

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
export class Menu {
  @prop({ unique: true })
    id: number;

  @IsDefined()
  @IsInt()
  @prop({ default: null })
    parent_id: number;

  @IsNotEmpty()
  @IsString()
  @prop({ required: true })
    name: string;

  @IsOptional()
  @IsString()
  @prop()
    route?: string;

  @IsOptional()
  @IsString()
  @prop()
    component?: string;

  @IsOptional()
  @IsString()
  @prop()
    perms?: string;

  @IsDefined()
  @IsIn([MenuType.directory, MenuType.menu, MenuType.button])
  @IsInt({ message: 'The type field should be a number: 0, 1 or 2' })
  @prop({ enum: MenuType, default: MenuType.directory, index: true })
    type: MenuType;

  @IsOptional()
  @IsString()
  @prop()
    icon?: string;

  @IsDefined()
  @IsInt()
  @prop({ default: 0 })
    order_num: number;

  @IsDefined()
  @IsBoolean()
  @prop({ default: false })
    keepalive: boolean;

  @prop({ default: Date.now, immutable: true })
    create_at?: Date;

  @prop({ default: Date.now })
    update_at?: Date;

  @IsOptional()
  @IsBoolean()
  @prop({ default: true })
    status: boolean;
}

export class MenuInfo {
  @IsOptional()
  @IsInt()
    id?: number;

  @IsOptional()
  @IsInt()
    parent_id?: number;

  @IsOptional()
  @IsBoolean()
    status?: boolean;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
    name: string;

  @IsOptional()
  @IsBoolean()
    keepalive?: boolean;

  @IsDefined()
  @IsNotEmpty()
  @IsInt()
    type: number;

  @IsOptional()
  @IsString()
    component?: string;

  @IsOptional()
  @IsString()
    icon?: string;

  @IsOptional()
  @IsString()
    route?: string;

  @IsOptional()
  @IsString()
    perms?: string;

  @IsOptional()
  @IsBoolean()
    is_ext?: boolean;
}

export const MenuProvider = getProviderByTypegooseClass(Menu);
