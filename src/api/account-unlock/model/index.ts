import {PageParam} from "@/api";

export interface AccountUnlock {
    id?: number;

    // 地区
    country?: string;

    // Spotify账号")
    email?: string;

    // Spotify密码")
    password?: string;

    // 处理状态")
    status?: number;

    // 会员ID")
    memberId?: number;

    // 租户id")
    tenantId?: number;

    // 操作时间")
    createTime?: string;

    // 修改时间")
    updateTime?: string;

}

/**
 * 用户搜索条件
 */
export interface AccountUnlockParam extends PageParam {
    // 自增id
    id?: number;
    // Spotify账号")
    email?: string;

    // Spotify密码")
    password?: string;

    // 处理状态")
    status?: number;
}