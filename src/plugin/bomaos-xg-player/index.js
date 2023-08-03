import {
    computed,
    createElementBlock,
    defineComponent,
    onBeforeUnmount,
    onBeforeUpdate,
    onMounted,
    openBlock
} from "vue";
import Player from "xgplayer";

const _sfc_main = defineComponent({
  name: "BomaosXgPlayer",
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  emits: ["player"],
  setup(props, { emit }) {
    let player = null;
    const playerId = computed(() => {
      var _a;
      return (_a = props.config) == null ? void 0 : _a.id;
    });
    const init = () => {
      var _a;
      if ((_a = props.config) == null ? void 0 : _a.url) {
        player = new Player(props.config);
        emit("player", player);
      }
    };
    onMounted(() => {
      init();
    });
    onBeforeUpdate(() => {
      init();
    });
    onBeforeUnmount(() => {
      if (player && typeof player.destroy === "function") {
        player.destroy();
      }
    });
    return { playerId };
  }
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = ["id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", { id: _ctx.playerId }, null, 8, _hoisted_1);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  index as default
};
