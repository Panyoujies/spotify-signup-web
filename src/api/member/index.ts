import request from '@/utils/request';
import {setToken} from '@/utils/token-util';
import type {ApiResult} from '@/api';
import type {CaptchaResult, LoginResult, Member} from './model';
import {AuthLoginParam, EmailParam, LoginParam} from "./model";

/**
 * 登录
 */
export async function login(data: LoginParam) {
  data.tenantId = 2; // 租户id
  const res = await request.post<ApiResult<LoginResult>>('/member/login', data);
  if (res.data.code === 0) {
    setToken(res.data.data?.access_token, data.remember);
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 登录
 */
export async function bindEmail(data: LoginParam) {
  data.tenantId = 2; // 租户id
  const res = await request.post<ApiResult<LoginResult>>('/member/bind-email', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 微信授权登录
 */
export async function getWechatAuthLogin(source: string) {
  const res = await request.get<ApiResult<LoginResult>>('/auth/authorized-url/' + source);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 登录
 */
export async function postAuthLogin(data: AuthLoginParam) {
  const res = await request.post<ApiResult<LoginResult>>('/auth/social-login/' + data.source, {
    code: data.code,
    state: data.state
  });
  if (res.data.code === 0) {
    setToken(res.data.data?.access_token, data.remember);
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取当前登录的用户信息、菜单、权限、角色
 */
export async function getMemberInfo(): Promise<Member> {
  const res = await request.get<ApiResult<Member>>('/member/auth/user');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取验证码
 */
export async function getCaptcha() {
  const res = await request.get<ApiResult<CaptchaResult>>('/member/captcha');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 发送邮件验证码
 */
export async function sendEmailCode(data: EmailParam) {
  const res = await request.post<ApiResult<LoginResult>>('/member/sendEmailVerificationCode', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}