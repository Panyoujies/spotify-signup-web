import type {CSSProperties} from 'vue';

declare const _sfc_main: import("vue").DefineComponent<{
    value: StringConstructor;
    size: {
        type: NumberConstructor;
        default: number;
    };
    level: {
        type: import("vue").PropType<import("./types").LevelType>;
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
    imageSettings: import("vue").PropType<import("./types").ImageSettings>;
    style: import("vue").PropType<CSSProperties>;
}, {
    canvasRef: import("vue").Ref<HTMLCanvasElement | null>;
    imageRef: import("vue").Ref<HTMLImageElement | null>;
    imageSrc: import("vue").ComputedRef<string | undefined>;
    canvasStyle: import("vue").ComputedRef<CSSProperties>;
    render: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "done"[], "done", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: StringConstructor;
    size: {
        type: NumberConstructor;
        default: number;
    };
    level: {
        type: import("vue").PropType<import("./types").LevelType>;
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
    imageSettings: import("vue").PropType<import("./types").ImageSettings>;
    style: import("vue").PropType<CSSProperties>;
}>> & {
    onDone?: ((...args: any[]) => any) | undefined;
}, {
    size: number;
    level: import("./types").LevelType;
    bgColor: string;
    fgColor: string;
    margin: number;
}>;
export default _sfc_main;
