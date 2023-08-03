import request from "@/utils/request";
import {ApiResult} from "@/api";
import {AuthorizeAccount, AuthorizeAccountParam, SpotifyAccountParam} from "@/api/spotify/authorize-account/model";

/**
 * 查询分类列表
 */
export async function listAuthorizeAccounts(params?: AuthorizeAccountParam) {
    const res = await request.get<ApiResult<AuthorizeAccount[]>>('/spotify/authorize-account', {
        params
    });
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 添加Spotify账号
 */
export async function addAuthorizeAccount(data: SpotifyAccountParam) {
    const res = await request.post<ApiResult<unknown>>('/spotify/authorize-account/submit', data);
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}