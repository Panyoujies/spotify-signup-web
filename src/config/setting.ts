// 接口地址
export const API_BASE_URL: string = import.meta.env.VITE_API_URL;

// 项目名称
export const PROJECT_NAME: string = import.meta.env.VITE_APP_NAME;

// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// 首页路径, 为空则取第一个菜单的地址
export const HOME_PATH: string | undefined = undefined;

// 外层布局的路由地址
export const LAYOUT_PATH = '/';

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS: string[] = [];

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'Authorization';

// token 存储的名称
export const TOKEN_STORE_NAME = 'access_token';

export const NAVIGAT_LIST: string[] = [
    '/user/login',
]

// 不需要登录的路由
export const WHITE_LIST: string[] = [
    '/',
    '/password-reset',
    '/download',
    '/social-login'
];
