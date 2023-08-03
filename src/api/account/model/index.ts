import type {PageParam} from '@/api';

/**
 * 注册码
 */
export interface Account {
  // 自增id
  id?: number;

  // Spotify账号
  email?: string;

  // Spotify密码
  password?: string;

  // 注册的用户
  memberId?: number;

  // 注册状态
  status?: number;

  signupCodeId?: number;

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
export interface AccountParam extends PageParam {
  // 自增id
  id?: number;

  // Spotify账号
  email?: string;

  // Spotify密码
  password?: string;

  // 注册的用户
  memberId?: number;

  // 注册状态
  status?: number;

  signupCodeId?: number;
}
