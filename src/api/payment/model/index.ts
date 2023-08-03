export interface AlipayResult {
    paymentType?: string;
    paymentOrderId?: string;
    paymentMoney?: string;
    paymentLink?: string;
}

export interface PaymentParam {
    paymentType?: string;
    orderType?: number;
    productId?: number;
    premiumType?: number;
}

export interface SignupCodeResult {
    /* 注册码 */
    code?: string;

    /* 使用状态 */
    status?: number;

    /* 领取方式 */
    assignMethod?: number;

    /* 使用类型 */
    codeType?: number;
}

export interface SalesCountResult {
    count?: number;
}