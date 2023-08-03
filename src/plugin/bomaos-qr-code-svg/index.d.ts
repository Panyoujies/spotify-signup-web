declare const _sfc_main: import("vue").DefineComponent<{
    value: StringConstructor;
    size: {
        type: NumberConstructor;
        default: number;
    };
    level: {
        type: import("vue").PropType<import("../bomaos-qr-code/types").LevelType>;
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
    imageSettings: import("vue").PropType<import("../bomaos-qr-code/types").ImageSettings>;
    style: import("vue").PropType<import("vue").CSSProperties>;
}, {
    viewBox: import("vue").Ref<string>;
    path: import("vue").Ref<string>;
    fgPath: import("vue").Ref<string>;
    imageHeight: import("vue").Ref<number>;
    imageWidth: import("vue").Ref<number>;
    imageX: import("vue").Ref<number>;
    imageY: import("vue").Ref<number>;
    imageSrc: import("vue").ComputedRef<string | undefined>;
    render: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "done"[], "done", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    value: StringConstructor;
    size: {
        type: NumberConstructor;
        default: number;
    };
    level: {
        type: import("vue").PropType<import("../bomaos-qr-code/types").LevelType>;
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
    imageSettings: import("vue").PropType<import("../bomaos-qr-code/types").ImageSettings>;
    style: import("vue").PropType<import("vue").CSSProperties>;
}>> & {
    onDone?: ((...args: any[]) => any) | undefined;
}, {
    size: number;
    level: import("../bomaos-qr-code/types").LevelType;
    bgColor: string;
    fgColor: string;
    margin: number;
}>;
export default _sfc_main;
