import request from '@/utils/request';
import type {ApiResult} from '@/api';
import {Signup} from "@/api/signup/model";

/**
 * 添加账户解锁
 */
export async function addAccount(data: Signup) {
  const res = await request.post<ApiResult<unknown>>('/member/account/submit', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
