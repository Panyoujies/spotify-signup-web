import type {PageParam} from '@/api';

/**
 * 注册码
 */
export interface Product {
  // 产品
  id?: number;

  // 产品名称
  name?: string;

  // 产品简介
  summary?: string;

  // 封面
  cover?: string;

  // 产品详情
  content?: string;

  // 提示词
  prompt?: string;

  // 产品金额
  money?: number;

  // 发货类型
  shipType?: number;

  // 卡密类型
  cardType?: number;

  // 产品状态
  status?: number;

  // 产品排序
  sortNumber?: number;

  // 分类ID
  categoryId?: number;

  // 库存数量
  stockNumber?: number;

  // 出售数量
  saleCount?: number;

  // 租户id
  tenantId?: number;

  // 操作时间
  createTime?: string;

  // 修改时间
  updateTime?: string;
}

/**
 * 用户搜索条件
 */
export interface ProductParam extends PageParam {
  // 产品
  id?: number;

  // 产品名称
  name?: string;

  // 产品简介
  summary?: string;

  // 发货类型
  shipType?: number;
}
