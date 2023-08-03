import {
    computed,
    createCommentVNode,
    createElementBlock,
    createElementVNode,
    defineComponent,
    openBlock,
    ref,
    watch
} from "vue";
import qrcodegen from "../bomaos-qr-code/qrcodegen";
import {ERROR_LEVEL_MAP, excavateModules, generatePath, getImageSettings} from "../bomaos-qr-code/util";
import props from "../bomaos-qr-code/props";

const _sfc_main = defineComponent({
  name: "BomaosQrCodeSvg",
  props,
  emits: ["done"],
  setup(props2, { emit }) {
    const viewBox = ref("");
    const path = ref("");
    const fgPath = ref("");
    const imageHeight = ref(0);
    const imageWidth = ref(0);
    const imageX = ref(0);
    const imageY = ref(0);
    const imageSrc = computed(
      () => {
        var _a;
        return (_a = props2.imageSettings) == null ? void 0 : _a.src;
      }
    );
    const render = () => {
      const { value, size, level, margin, imageSettings } = props2;
      if (!value) {
        viewBox.value = "";
        return;
      }
      let cells = qrcodegen.QrCode.encodeText(
        value,
        ERROR_LEVEL_MAP[level]
      ).getModules();
      const numCells = cells.length + margin * 2;
      const calculatedImageSettings = getImageSettings(
        imageSettings,
        size,
        margin,
        cells
      );
      if (imageSettings != null && calculatedImageSettings != null) {
        if (calculatedImageSettings.excavation != null) {
          cells = excavateModules(cells, calculatedImageSettings.excavation);
        }
        imageHeight.value = calculatedImageSettings.h;
        imageWidth.value = calculatedImageSettings.w;
        imageX.value = calculatedImageSettings.x + margin;
        imageY.value = calculatedImageSettings.y + margin;
      }
      viewBox.value = `0 0 ${numCells} ${numCells}`;
      path.value = `M0,0 h${numCells}v${numCells}H0z`;
      fgPath.value = generatePath(cells, margin);
      emit("done");
    };
    watch(
      [
        () => props2.value,
        () => props2.size,
        () => props2.level,
        () => props2.margin
      ],
      () => {
        render();
      },
      {
        immediate: true
      }
    );
    watch(
      () => props2.imageSettings,
      () => {
        render();
      },
      {
        deep: true
      }
    );
    return {
      viewBox,
      path,
      fgPath,
      imageHeight,
      imageWidth,
      imageX,
      imageY,
      imageSrc,
      render
    };
  }
});
const _export_sfc = (sfc, props2) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1 = { class: "bomaos-qr-code" };
const _hoisted_2 = ["height", "width", "viewBox"];
const _hoisted_3 = ["fill", "d"];
const _hoisted_4 = ["fill", "d"];
const _hoisted_5 = ["xlink:href", "height", "width", "x", "y"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1, [
    _ctx.viewBox ? (openBlock(), createElementBlock("svg", {
      key: 0,
      shapeRendering: "crispEdges",
      height: _ctx.size,
      width: _ctx.size,
      viewBox: _ctx.viewBox
    }, [
      createElementVNode("path", {
        fill: _ctx.bgColor,
        d: _ctx.path
      }, null, 8, _hoisted_3),
      createElementVNode("path", {
        fill: _ctx.fgColor,
        d: _ctx.fgPath
      }, null, 8, _hoisted_4),
      _ctx.imageSrc ? (openBlock(), createElementBlock("image", {
        key: 0,
        "xlink:href": _ctx.imageSrc,
        height: _ctx.imageHeight,
        width: _ctx.imageWidth,
        x: _ctx.imageX,
        y: _ctx.imageY,
        preserveAspectRatio: "none"
      }, null, 8, _hoisted_5)) : createCommentVNode("", true)
    ], 8, _hoisted_2)) : createCommentVNode("", true)
  ]);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  index as default
};
