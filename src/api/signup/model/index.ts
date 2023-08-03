export interface Signup {
    username?: string,
    password?: string,
    nickname?: string
    region?: string;
    resetUrl?: string;
    code?: string;
}

export interface SignupResult {
    /* 邮箱账号 */
    email?: string;

    /* 密码 */
    password?: string;

    /* 用户名 */
    displayName?: string;
}