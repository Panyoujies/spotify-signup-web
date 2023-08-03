/**
 * axios 实例
 */
import type {AxiosResponse} from "axios";
import axios from "axios";
import {API_BASE_URL, LAYOUT_PATH, TOKEN_HEADER_NAME} from "@/config/setting";
import type {ApiResult} from "@/api";
import {getToken, setToken} from "@/utils/token-util";
import {logout} from "@/utils/page-tab-util";
import router from "@/router";
import {useAuthStore} from "@/store/modules/authStore";
import {Modal} from "ant-design-vue/es";

const service = axios.create({
  baseURL: API_BASE_URL
});

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  (config) => {
      // 添加 token 到 header
      const token = getToken();
      if (token && config.headers) {
          config.headers[TOKEN_HEADER_NAME] = token;
      }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  (res: AxiosResponse<ApiResult<unknown>>) => {
      // 登录过期处理
      if (res.data?.code === 401) {
          const currentPath = unref(router.currentRoute).path;
          if (currentPath == LAYOUT_PATH) {
              logout(true);
          } else {
              Modal.destroyAll();
              const authStore = useAuthStore();
              authStore.openModal(currentPath);
          }
          return Promise.reject(new Error(res.data.message));
      }
      // token 自动续期
      const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()];
      if (token) {
          setToken(token);
      }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
