import {PageParam} from "@/api";

export interface Ticket {
  // 自增id")
  id?: number;

  // 车辆名称
  classifyName?: string;

  // 车票状态")
  status?: number;

  // 车位")
  parkingSpace?: number;

  // 车票ID")
  ticketId?: string;

  // 车辆ID")
  classifyId?: number;

  // 车辆id")
  vehicleId?: number;

  // 会员ID")
  memberId?: number;

  // 账号id")
  accountId?: number;

  // 套餐类型")
  comboType?: number;

  // 租户id")
  tenantId?: number;

  // 过期时间")
  expireTime?: string;

  // 订单创建时间")
  createTime?: string;

  // 修改时间")
  updateTime?: string;
}

/**
 * 搜索条件
 */
export interface TicketParam extends PageParam {
  id?: number;

  // 车票ID")
  ticketId?: string;

  // 车辆ID")
  classifyId?: number;

  // 车辆id")
  vehicleId?: number;
}
