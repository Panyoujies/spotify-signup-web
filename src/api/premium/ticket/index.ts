import request from "@/utils/request";
import type {ApiResult, PageResult} from "@/api";
import type {Ticket, TicketParam} from "./model";

/**
 * 分页查询用户
 */
export async function pageTickets(params: TicketParam) {
  const res = await request.get<ApiResult<PageResult<Ticket>>>(
    '/premium/ticket/page',
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
export async function listTickets(params?: TicketParam) {
  const res = await request.get<ApiResult<Ticket[]>>('/premium/ticket', {
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
export async function getTicket(id: number) {
  const res = await request.get<ApiResult<Ticket>>('/premium/ticket/' + id);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 */
export async function updateTicket(data: Ticket) {
  const res = await request.put<ApiResult<unknown>>('/premium/ticket', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

