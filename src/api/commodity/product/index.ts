import request from "@/utils/request";
import {ApiResult} from "@/api";
import {Product} from "@/api/commodity/product/model";


/**
 * 根据id查询分类
 */
export async function getProduct(id: number) {
    const res = await request.get<ApiResult<Product>>('/commodity/product/' + id);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}