import {Category} from "@/api/commodity/category/model";
import {ApiResult} from "@/api";
import request from "@/utils/request";

/**
 * 查询分类列表
 */
export async function listCategorys() {
    const res = await request.get<ApiResult<Category[]>>('/commodity/category');
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}