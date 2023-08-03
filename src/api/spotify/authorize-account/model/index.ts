export interface AuthorizeAccount {
    id?: number;

    // Spotify账号")
    email?: string;

    // Spotify密码")
    password?: string;

    // 授权cookie")
    cookie?: string;

    // 授权的用户")
    memberId?: number;

    // 授权状态")
    status?: number;

    // 租户id")
    tenantId?: number;

    // 操作时间")
    createTime?: string;

    // 修改时间")
    updateTime?: string;
}

export interface SpotifyAccountParam {
    email?: string;
    password?: string;
    ticketId?: number;
}

export interface AuthorizeAccountParam {
    id?: number;

    // Spotify账号")
    email?: string;

    // Spotify密码")
    password?: string;

    // 授权cookie")
    cookie?: string;
}