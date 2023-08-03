import request from "@/utils/request";
import {ApiResult} from "@/api";
import {AlipayResult, PaymentParam, SignupCodeResult} from "@/api/payment/model";

/**
 * 提交注册
 */
export async function faceToFace(param?: PaymentParam) {
    const res = await request.post<ApiResult<AlipayResult>>('/payment/get-payment-link', param);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 检测是否支付成功
 */
export async function paymentStatus(orderId?: string) {
    const res = await request.get<ApiResult<SignupCodeResult>>('/payment/payment-status/' + orderId);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 创建订单并返回支付
 */
export async function createPayment(param?: PaymentParam) {
    const res = await request.post<ApiResult<AlipayResult>>('/order/order/create', param);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 检测是否支付成功
 */
export async function paymentOrderStatus(orderId?: string) {
    const res = await request.get<ApiResult<SignupCodeResult>>('/order/order/payment-status/' + orderId);
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}