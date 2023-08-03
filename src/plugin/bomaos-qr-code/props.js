const props = {
  // 绑定值
  value: String,
  // 尺寸
  size: {
    type: Number,
    default: 128
  },
  // 容错等级
  level: {
    type: String,
    default: "L"
  },
  // 背景色
  bgColor: {
    type: String,
    default: "#FFFFFF"
  },
  // 颜色
  fgColor: {
    type: String,
    default: "#000000"
  },
  // 外间距
  margin: {
    type: Number,
    default: 0
  },
  // 自定义图片
  imageSettings: Object,
  // 自定义样式
  style: Object
};
export {
  props as default
};
