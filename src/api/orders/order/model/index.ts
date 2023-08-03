import {PageParam} from "@/api";

export interface Order {
    // 自增id
    id?: number;

    // 订单号
    orderId?: string;

    // 交易金额
    money?: number;

    // 交易流水号
    serialNumber?: string;

    // 订单状态
    status?: number;

    // 交易类型(1、新订单, 2、续费订单)
    transactionType?: number;

    // 商品名称
    productName?: string;

    // 车辆ID
    productId?: number;

    classifyName?: string;

    // 会员昵称
    nickName?: string;

    // 会员ID
    memberId?: number;

    // 支付方式
    paymentType?: string;

    stockInfo?: string;

    stockId?: number;

    // 订单创建时间
    createTime?: string;

    // 修改时间
    updateTime?: string;
}

/**
 * 用户搜索条件
 */
export interface OrderParam extends PageParam {
    productId?: number;
    orderId?: string;
    status?: number;
    paymentType?: string;
    serialNumber?: string;
}
