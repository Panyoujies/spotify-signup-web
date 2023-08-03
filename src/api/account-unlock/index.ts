import {AccountUnlock, AccountUnlockParam} from "@/api/account-unlock/model";
import {ApiResult, PageResult} from "@/api";
import request from "@/utils/request";
import {Signup, SignupResult} from "@/api/signup/model";

/**
 * 分页查询账户解锁
 */
export async function pageAccountUnlocks(params?: AccountUnlockParam) {
    const res = await request.get<ApiResult<PageResult<AccountUnlock>>>(
        '/member/account-unlock/page',
        { params }
    );
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 添加账户解锁
 */
export async function addAccountUnlock(data: AccountUnlock) {
    const res = await request.post<ApiResult<unknown>>('/member/account-unlock/save', data);
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 提交Spotify账号
 */
export async function signup(data: Signup) {
    const res = await request.post<ApiResult<SignupResult>>('/spotify/signup', data);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}