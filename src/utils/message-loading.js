import {message} from "ant-design-vue/es";

function messageLoading(content, duration, onClose) {
  const classes = ["bomaos-message-loading"];
  const option = {};
  if (typeof content === "object" && content !== null) {
    Object.assign(option, content);
    if (content.mask) {
      classes.push("ele-message-mask");
    }
    if (content.center) {
      classes.push("ele-message-center");
    }
    if (content.class) {
      classes.push(content.class);
    }
  } else {
    option.content = content;
    if (typeof duration === "function") {
      option.onClose = duration;
    } else {
      option.duration = duration;
      option.onClose = onClose;
    }
  }
  option.class = classes.join(" ");
  return message.loading(option);
}
export {
  messageLoading
};
