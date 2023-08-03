/**
 * 容错等级
 */
export type LevelType = 'L' | 'M' | 'Q' | 'H';
/**
 * 自定义图片参数
 */
export interface ImageSettings {
    src?: string;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
    excavate?: boolean;
}
/**
 * 二维码数据
 */
export type Modules = boolean[][];
/**
 * 擦除区域
 */
export interface Excavation {
    x: number;
    y: number;
    w: number;
    h: number;
}
