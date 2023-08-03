import request from "@/utils/request";
import type {ApiResult, PageResult} from "@/api";
import type {Classify, ClassifyParam} from "./model";

/**
 * 分页查询用户
 */
export async function pageClassifys(params: ClassifyParam) {
  const res = await request.get<ApiResult<PageResult<Classify>>>(
    '/premium/classify/page',
    { params }
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询用户列表
 */
export async function listClassifys(params?: ClassifyParam) {
  const res = await request.get<ApiResult<Classify[]>>('/premium/classify', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询用户
 */
export async function getClassify(id: number) {
  const res = await request.get<ApiResult<Classify>>(
    '/premium/classify/' + id
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加用户
 */
export async function addClassify(data: Classify) {
  const res = await request.post<ApiResult<unknown>>(
    '/premium/classify',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 */
export async function updateClassify(data: Classify) {
  const res = await request.put<ApiResult<unknown>>(
    '/premium/classify',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 */
export async function updateClassifyByDescription(data: Classify) {
  const res = await request.put<ApiResult<unknown>>(
    '/premium/classify/updateClassifyByDescription',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除用户
 */
export async function removeClassify(id?: number) {
  const res = await request.delete<ApiResult<unknown>>(
    '/premium/classify/' + id
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除用户
 */
export async function removeClassifys(data: (number | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/premium/classify/batch',
    {
      data
    }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户状态
 */
export async function updateClassifyStatus(id?: number, status?: number) {
  const res = await request.put<ApiResult<unknown>>(
    '/premium/classify/state',
    {
      id,
      status
    }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
