export interface TicketOrders {
    // 自增id")
    id?: number;

    // 订单号")
    orderId?: string;

    // 交易金额")
    money?: number;

    // 交易流水号")
    serialNumber?: string;

    // 订单状态")
    status?: number;

    // 交易类型(1、新订单, 2、续费订单)")
    transactionType?: string;

    // 套餐类型")
    comboType?: number;

    // 分类ID")
    classifyId?: number;

    // 会员ID")
    memberId?: number;

    // 支付方式")
    paymentType?: string;

    // 租户id")
    tenantId?: number;

    // 订单创建时间")
    createTime?: string;

    // 修改时间")
    updateTime?: string;
}

export interface TicketPaymentParam {
    paymentType?: string;
    classifyId?: number;
    transactionType?: number;
}