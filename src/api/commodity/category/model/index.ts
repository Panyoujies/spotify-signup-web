import type {PageParam} from '@/api';
import {Product} from "@/api/commodity/product/model";

/**
 * 注册码
 */
export interface Category {
  // 自增ID
  id?: number;

  // 分类名称
  name?: string;

  // 封面
  cover?: string;

  // 分类状态
  status?: number;

  // 排序
  sortNumber?: number;

  // 租户id
  tenantId?: number;

  // 操作时间
  createTime?: string;

  // 修改时间
  updateTime?: string;

  // 产品列表
  products?: Array<Product>;
}

/**
 * 用户搜索条件
 */
export interface CategoryParam extends PageParam {
  // 自增ID
  id?: number;

  // 分类名称
  name?: string;

  // 分类状态
  status?: number;
}
