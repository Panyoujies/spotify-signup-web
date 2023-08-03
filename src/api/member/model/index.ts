export interface Member {
  // 自增ID
  id?: number;

  // 邀请链接
  sid?: string;

  // 昵称
  nickName?: string;

  // 头像
  avatar?: string;

  // 性别
  sex?: number;

  // 手机号
  phone?: string;

  // 邮箱
  email?: string;

  // 密码
  password?: string;

  // 邮箱是否验证,0否,1是
  emailVerified?: number;

  // 状态,0正常,1冻结
  state?: number;

  // 余额
  balance?: number;

  // 冻结余额
  freezeBalance?: number;

  // 返利金额
  rebateAmount?: number;

  // 返利比例
  rebatePercentage?: number;

  // 个人简介
  introduction?: string;

  // 微信登录凭证
  wxCode?: string;

  // 是否删除,0否,1是
  deleted?: number;

  // 租户id
  tenantId?: number;

  // 注册时间
  createTime?: string;

  // 修改时间
  updateTime?: string;
}

/**
 * 登录参数
 */
export interface LoginParam {
  // 账号
  email?: string;
  code?: string;
  // 租户id
  tenantId?: number;
  // 是否记住密码
  remember?: boolean;
}

export interface AuthLoginParam {
  source?: string;
  code?: string;
  state?: string;
  // 是否记住密码
  remember?: boolean;
}

/**
 * 登录返回结果
 */
export interface LoginResult {
  // token
  access_token?: string;
  // 授权地址
  authorizeUrl?: string;
}

/**
 * 登录返回结果
 */
export interface EmailParam {
  sendType?: string;
  // token
  email?: string;
}

/**
 * 图形验证码返回结果
 */
export interface CaptchaResult {
  // 图形验证码base64数据
  base64: string;
  // 验证码文本
  text: string;
}