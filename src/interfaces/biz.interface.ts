/**
 * @file Business constants & interfaces
 * @module interface/biz
 * @author Name6
 */

// 发布状态
export enum PublishState {
  Draft = 0, // 草稿
  Published = 1, // 已发布
  Recycle = -1, // 回收站
}

// 公开状态
export enum PublicState {
  Password = 0, // 需要密码
  Public = 1, // 公开状态
  Secret = -1, // 私密
}

// 转载状态
export enum OriginState {
  Original = 0, // 原创
  Reprint = 1, // 转载
  Hybrid = 2, // 混合
}

// 排序状态
export enum SortType {
  Asc = 1, // 升序
  Desc = -1, // 降序
  Hot = 2, // 最热
}
