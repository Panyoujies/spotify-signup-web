import {PageParam} from "@/api";

export interface Vehicle {
  // 自增ID")
  id?: number;

  // 车辆账号")
  email?: string;

  // 车辆密码")
  password?: string;

  // 邮箱密码")
  emailPassword?: string;

  // spotify 邀请链接")
  inviteLink?: string;

  // Spotify邀请地址")
  inviteAddress?: string;

  // 车辆备注")
  remark?: string;

  // 车辆类型")
  classifyId?: number;

  // 车辆状态")
  status?: number;

  // 信用卡id")
  creditCardId?: string;

  // 售出数量")
  soldNumber?: number;

  // 租户id")
  tenantId?: number;

  // 上次密码重置时间")
  passwordResetTime?: string;

  // 创建时间")
  createTime?: string;

  // 更新时间")
  updateTime?: string;
}

/**
 * 搜索条件
 */
export interface VehicleParam extends PageParam {
  id?: number;
  name?: string;
  status?: number;
  classifyId?: number;
}
