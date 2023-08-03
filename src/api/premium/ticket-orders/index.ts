import {AlipayResult, SignupCodeResult} from "@/api/payment/model";
import request from "@/utils/request";
import {ApiResult} from "@/api";
import {TicketPaymentParam} from "@/api/premium/ticket-orders/model";

/**
 * 创建订单并返回支付
 */
export async function createTicketPayment(param?: TicketPaymentParam) {
    const res = await request.post<ApiResult<AlipayResult>>('/premium/ticket-orders/create', param);
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
    return Promise.reject(new Error(res.data.message));
}

/**
 * 检测是否支付成功
 */
export async function paymentTicketOrderStatus(orderId?: string) {
    const res = await request.get<ApiResult<SignupCodeResult>>('/premium/ticket-orders/payment-status/' + orderId);
    if (res.data.code === 0) {
        return res.data.message;
    }
    return Promise.reject(new Error(res.data.message));
}