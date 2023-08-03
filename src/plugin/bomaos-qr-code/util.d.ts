import qrcodegen from './qrcodegen';
import type {Excavation, ImageSettings, Modules} from './types';

export declare const ERROR_LEVEL_MAP: {
    L: qrcodegen.QrCode.Ecc;
    M: qrcodegen.QrCode.Ecc;
    Q: qrcodegen.QrCode.Ecc;
    H: qrcodegen.QrCode.Ecc;
};
export declare const DEFAULT_IMG_SCALE = 0.1;
export declare const SUPPORTS_PATH2D: boolean;
/**
 * 获取自定义
 * @param imageSettings 图片参数
 * @param size 二维码尺寸
 * @param margin 二维码间距
 * @param cells 二维码数据
 */
export declare function getImageSettings(imageSettings: ImageSettings | undefined | null, size: number, margin: number, cells: Modules): null | {
    x: number;
    y: number;
    h: number;
    w: number;
    excavation: Excavation | null;
};
export declare function excavateModules(modules: Modules, excavation: Excavation): Modules;
export declare function generatePath(modules: Modules, margin?: number): string;
