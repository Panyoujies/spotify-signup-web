/** 带遮罩层 loading */
import type {VNodeTypes} from 'vue';
import type {ConfigOnClose, MessageArgsProps, MessageType} from 'ant-design-vue/es/message';

/**
 * 参数类型
 */
export interface MessageLoadingOption extends MessageArgsProps {
    /** 是否显示遮罩层 */
    mask?: boolean;
    /** 是否居中 */
    center?: boolean;
}

/**
 * 带遮罩层的加载框
 */
export declare function messageLoading(content: VNodeTypes | MessageLoadingOption, duration?: number | (() => void), onClose?: ConfigOnClose): MessageType;
