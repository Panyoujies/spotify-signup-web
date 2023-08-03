/**
 * 页签操作封装
 */
import {unref} from 'vue';
import type {RouteLocationNormalizedLoaded} from 'vue-router';
import router from '@/router';
import {removeToken} from '@/utils/token-util';
import {HOME_PATH, LAYOUT_PATH, REPEATABLE_TABS} from '@/config/setting';
import {useAuthStore} from "@/store/modules/authStore";
import {useMemberStore} from "@/store/modules/member";

const HOME_ROUTE = HOME_PATH || LAYOUT_PATH;
const BASE_URL = import.meta.env.BASE_URL;

/**
 * 刷新页签参数类型
 */
export interface TabReloadOptions {
  // 是否是主页
  isHome?: boolean;
  // 路由地址
  fullPath?: string;
}

/**
 * 获取当前路由对应的页签 key
 */
export function getRouteTabKey() {
  const { path, fullPath, meta } = unref(router.currentRoute);
  const isUnique = meta.tabUnique === false || REPEATABLE_TABS.includes(path);
  return isUnique ? fullPath : path;
}

/**
 * 判断路由是否是主页
 * @param route 路由信息
 */
export function isHomeRoute(route: RouteLocationNormalizedLoaded) {
  const { path, matched } = route;
  if (HOME_ROUTE === path) {
    return true;
  }
  return (
    matched[0] &&
    matched[0].path === LAYOUT_PATH &&
    matched[0].redirect === path
  );
}

/**
 * 登录成功后跳转首页
 * @param from 登录前的地址
 */
export function goHomeRoute(from?: string) {
  router.replace(from || HOME_ROUTE);
}

/**
 * 退出登录
 * @param route 是否使用路由跳转
 * @param from 登录后跳转的地址
 */
export function logout(route?: boolean, from?: string) {
  const userStore = useMemberStore();
  removeToken();
  userStore.info = null;
  if (route) {
    const authStore = useAuthStore();
    authStore.openModal();
  } else {
    // 这样跳转避免再次登录重复注册动态路由
    location.replace(BASE_URL + '' + (from ? '?from=' + from : ''));
  }
}
