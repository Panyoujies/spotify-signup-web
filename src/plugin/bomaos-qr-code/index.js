import {
    computed,
    createCommentVNode,
    createElementBlock,
    createElementVNode,
    defineComponent,
    nextTick,
    normalizeStyle,
    onMounted,
    openBlock,
    ref,
    watch
} from "vue";
import qrcodegen from "./qrcodegen";
import props from "./props";
import {ERROR_LEVEL_MAP, excavateModules, generatePath, getImageSettings, SUPPORTS_PATH2D} from "./util";

const _sfc_main = defineComponent({
  name: "BomaosQrCode",
  props,
  emits: ["done"],
  setup(props2, { emit }) {
    const canvasRef = ref(null);
    const imageRef = ref(null);
    const imageSrc = computed(
      () => {
        var _a;
        return (_a = props2.imageSettings) == null ? void 0 : _a.src;
      }
    );
    const canvasStyle = computed(() => {
      return {
        height: `${props2.size}px`,
        width: `${props2.size}px`,
        ...props2.style
      };
    });
    const render = () => {
      const { value, size, level, bgColor, fgColor, margin, imageSettings } = props2;
      if (canvasRef.value == null) {
        return;
      }
      const canvas = canvasRef.value;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      if (!value) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      const image = imageRef.value;
      const haveImageToRender = calculatedImageSettings != null && image != null && image.complete && image.naturalHeight !== 0 && image.naturalWidth !== 0;
      if (haveImageToRender && calculatedImageSettings.excavation != null) {
        cells = excavateModules(cells, calculatedImageSettings.excavation);
      }
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.height = canvas.width = size * pixelRatio;
      const scale = size / numCells * pixelRatio;
      ctx.scale(scale, scale);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, numCells, numCells);
      ctx.fillStyle = fgColor;
      if (SUPPORTS_PATH2D) {
        ctx.fill(new Path2D(generatePath(cells, margin)));
      } else {
        cells.forEach(function(row, rdx) {
          row.forEach(function(cell, cdx) {
            if (cell) {
              ctx.fillRect(cdx + margin, rdx + margin, 1, 1);
            }
          });
        });
      }
      if (haveImageToRender) {
        ctx.drawImage(
          image,
          calculatedImageSettings.x + margin,
          calculatedImageSettings.y + margin,
          calculatedImageSettings.w,
          calculatedImageSettings.h
        );
      }
      emit("done");
    };
    watch(
      [
        () => props2.value,
        () => props2.level,
        () => props2.bgColor,
        () => props2.fgColor,
        () => props2.margin
      ],
      () => {
        render();
      }
    );
    watch(
      () => props2.size,
      () => {
        nextTick(() => {
          render();
        });
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
    onMounted(() => {
      render();
    });
    return {
      canvasRef,
      imageRef,
      imageSrc,
      canvasStyle,
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
const _hoisted_2 = ["height", "width"];
const _hoisted_3 = ["src"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("span", _hoisted_1, [
    createElementVNode("canvas", {
      ref: "canvasRef",
      height: _ctx.size,
      width: _ctx.size,
      style: normalizeStyle(_ctx.canvasStyle)
    }, null, 12, _hoisted_2),
    _ctx.imageSrc ? (openBlock(), createElementBlock("img", {
      key: 0,
      ref: "imageRef",
      src: _ctx.imageSrc,
      style: { display: "none" },
      onLoad: _cache[0] || (_cache[0] = (...args) => _ctx.render && _ctx.render(...args))
    }, null, 40, _hoisted_3)) : createCommentVNode("", true)
  ]);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  index as default
};
