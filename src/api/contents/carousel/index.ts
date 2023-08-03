import request from "@/utils/request";
import type {ApiResult, PageResult} from "@/api";
import {Carousel, CarouselParam} from "./model";

/**
 * 分页查询品类
 */
export async function pageCarousels(params: CarouselParam) {
  const res = await request.get<ApiResult<PageResult<Carousel>>>(
    '/contents/carousel/page',
    { params }
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 查询品类列表
 */
export async function listCarousels(params?: CarouselParam) {
  const res = await request.get<ApiResult<Carousel[]>>(
    '/contents/carousel',
    {
      params
    }
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询品类
 */
export async function getCarousel(id: number) {
  const res = await request.get<ApiResult<Carousel>>(
    '/contents/carousel/' + id
  );
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加品类
 */
export async function addCarousel(data: Carousel) {
  const res = await request.post<ApiResult<unknown>>(
    '/contents/carousel',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改品类
 */
export async function updateCarousel(data: Carousel) {
  const res = await request.put<ApiResult<unknown>>(
    '/contents/carousel',
    data
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除品类
 */
export async function removeCarousel(id?: number) {
  const res = await request.delete<ApiResult<unknown>>(
    '/contents/carousel/' + id
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除品类
 */
export async function removeCarousels(data: (number | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/contents/carousel/batch',
    {
      data
    }
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
