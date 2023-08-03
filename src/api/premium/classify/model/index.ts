import {PageParam} from "@/api";

export interface Classify {
  // 自增ID
  id?: number;

  // 国家
  country?: string;

  // 分类名称
  name?: string;

  // 简介
  summary?: string;

  // 图标
  icon?: string;

  // 状态
  status?: number;

  // 排序
  sortNumber?: number;

  //
  soldNumber?: number;

  // 车辆价格
  money?: number;

  // 单位
  unit?: string;

  duration?: number;

  // 标签
  tags?: string;

  // 售货类型0自动,1手动
  salesType?: number;

  // 车位数量
  parkingSpaces?: number;

  // 帮助链接
  explainUrl?: string;

  // 账号说明
  description?: string;

  // 租户id
  tenantId?: number;

  // 创建时间
  createTime?: string;

  // 更新时间
  updateTime?: string;
}

export interface ClassifyFormat {
  id?: number;
  classifyType?: number;
}

/**
 * 搜索条件
 */
export interface ClassifyParam extends PageParam {
  name?: string;
  status?: number;
}
