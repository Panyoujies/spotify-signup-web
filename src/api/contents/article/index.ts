import request from "@/utils/request";
import type { ApiResult, PageResult } from "@/api";
import type { Article, ArticleParam } from "./model";

/**
 * 分页查询用户
 */
export async function pageArticles(params: ArticleParam) {
  const res = await request.get<ApiResult<PageResult<Article>>>(
    '/contents/article/page',
    { params }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询用户
 */
export async function getArticle(id?: number) {
  const res = await request.get<ApiResult<Article>>('/contents/article/' + id);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 */
export async function updateArticle(data: Article) {
  const res = await request.put<ApiResult<unknown>>('/contents/article', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}