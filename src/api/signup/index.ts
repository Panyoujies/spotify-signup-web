import {ApiResult} from "@/api";
import request from "@/utils/request";
import {Signup, SignupResult} from "@/api/signup/model";
import {SalesCountResult, SignupCodeResult} from "@/api/payment/model";

/**
 * 检测邮箱是否可用
 */
export async function validate(params?: Signup) {
    const res = await request.get<ApiResult<unknown>>('/spotify/validate', { params });
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 提交注册
 */
export async function signup(data: Signup) {
    const res = await request.post<ApiResult<SignupResult>>('/spotify/signup', data);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 获取重置链接
 */
export async function sendResetUrl(data: Signup) {
    const res = await request.post<ApiResult<unknown>>('/spotify/recovery', data);
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 修改密码
 */
export async function passwordReset(data: Signup) {
    const res = await request.post<ApiResult<unknown>>('/spotify/password-reset', data);
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 获取用户购买的注册码
 */
export async function getSignupCode(codeType?: number) {
    const res = await request.get<ApiResult<SignupCodeResult>>('/marketing/signup-code/get-signup-code/' + codeType);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 获取售出注册码统计
 */
export async function getSalesCount() {
    const res = await request.get<ApiResult<SalesCountResult>>('/marketing/signup-code/get-sales-count');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}