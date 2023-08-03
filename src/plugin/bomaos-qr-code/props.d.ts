import type {CSSProperties, PropType} from 'vue';
import type {ImageSettings, LevelType} from './types';

declare const _default: {
    value: StringConstructor;
    size: {
        type: NumberConstructor;
        default: number;
    };
    level: {
        type: PropType<LevelType>;
        default: string;
    };
    bgColor: {
        type: StringConstructor;
        default: string;
    };
    fgColor: {
        type: StringConstructor;
        default: string;
    };
    margin: {
        type: NumberConstructor;
        default: number;
    };
    imageSettings: PropType<ImageSettings>;
    style: PropType<CSSProperties>;
};
export default _default;
