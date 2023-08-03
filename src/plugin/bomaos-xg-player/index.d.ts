import type {PropType} from 'vue';
import type {IPlayerOptions} from 'xgplayer';

declare const _sfc_main: import("vue").DefineComponent<{
    config: {
        type: PropType<IPlayerOptions>;
        required: true;
    };
}, {
    playerId: import("vue").ComputedRef<string | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "player"[], "player", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    config: {
        type: PropType<IPlayerOptions>;
        required: true;
    };
}>> & {
    onPlayer?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
