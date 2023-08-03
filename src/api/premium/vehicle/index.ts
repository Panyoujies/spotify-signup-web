import request from "@/utils/request";
import type {ApiResult, PageResult} from "@/api";
import type {Vehicle, VehicleParam} from "./model";

/**
 * 分页查询用户
 */
export async function pageVehicles(params: VehicleParam) {
  const res = await request.get<ApiResult<PageResult<Vehicle>>>(
    '/premium/vehicle/page',
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
export async function listVehicles(params?: VehicleParam) {
  const res = await request.get<ApiResult<Vehicle[]>>('/premium/vehicle', {
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
export async function getVehicle(id: number) {
  const res = await request.get<ApiResult<Vehicle>>('/premium/vehicle/' + id);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 添加用户
 */
export async function addVehicle(data: Vehicle) {
  const res = await request.post<ApiResult<unknown>>(
    '/premium/vehicle',
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
export async function updateVehicle(data: Vehicle) {
  const res = await request.put<ApiResult<unknown>>('/premium/vehicle', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除用户
 */
export async function removeVehicle(id?: number) {
  const res = await request.delete<ApiResult<unknown>>(
    '/premium/vehicle/' + id
  );
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除用户
 */
export async function removeVehicles(data: (number | undefined)[]) {
  const res = await request.delete<ApiResult<unknown>>(
    '/premium/vehicle/batch',
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
export async function updateVehicleStatus(id?: number, status?: number) {
  const res = await request.put<ApiResult<unknown>>('/premium/vehicle/status', { id, status });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
