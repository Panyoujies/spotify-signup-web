import {Order, OrderParam} from "./model";
import request from "@/utils/request";
import {ApiResult, PageResult} from "@/api";

/**
 * 分页查询账户解锁
 */
export async function pageOrders(params?: OrderParam) {
    const res = await request.get<ApiResult<PageResult<Order>>>(
        '/order/order/page',
        { params }
    );
    if (res.data.code === 0) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}