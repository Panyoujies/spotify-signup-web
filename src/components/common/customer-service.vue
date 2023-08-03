<template>
  <float-button-group
      trigger="click"
      type="primary"
      :style="{ right: '15px', bottom: '85px' }"
      class="bomaos-safe-area-bottom"
  >
    <template #icon>
      <CustomerServiceOutlined />
    </template>
    <float-button @click="showTools">
      <template #icon>
        <wechat-outlined />
      </template>
    </float-button>
    <float-button @click="openChat">
      <template #icon>
        <CommentOutlined />
      </template>
    </float-button>
  </float-button-group>
  <wechat v-model:visible="show"/>
</template>

<script setup lang="ts">
import FloatButton, {FloatButtonGroup} from 'ant-design-vue/es/float-button';
import {CommentOutlined, CustomerServiceOutlined, WechatOutlined} from '@ant-design/icons-vue';
import {Crisp} from "crisp-sdk-web";

const show = ref(false);

/* 客服列表 */
const showTools = () => {
  show.value = true;
}

/* 打开聊天窗口 */
const openChat = () => {
  Crisp.chat.open()
}
</script>

<style scoped lang="less">
.fixed-wrapper {
  position: fixed;
  z-index: 1000;
  bottom: 150px;
  right: 0;
  text-align: center;

  .fixed-btn {
    cursor: pointer;
    width: 40px;
    height: 50px;
    background-color: #31c27c;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    animation: pulse-200b62b6 2s infinite;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .icon {
      font-size: 18px;
      margin-top: -4px;
    }
  }
}

.css-17m4abj {
  width: 320px;
  bottom: 150px;
  right: 20px;
}

 .css-17m4abj {
   width: 320px;
   position: fixed;
   bottom: 150px;
   right: 20px;
   color: #262626;
 }

.css-11pnfhj {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #CBD5E0;
  background: #FFFFFF;
  border-radius: 5px;
}

.css-15maz6n {
  font-size: 16px;
  font-weight: 700;
  text-align: center;
}

.css-1f2vcwt {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.css-svjswr {
  opacity: 0.6;
  border-width: 0px 0px 1px;
  border-image: initial;
  border-color: inherit;
  border-style: solid;
  width: 100%;
}
.css-11pnfhj > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0px;
  margin-bottom: 0px;
}

.css-gxqald {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-inline-start: 1.25rem;
  padding-inline-end: 1.25rem;
}
.css-11pnfhj > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0px;
  margin-bottom: 0px;
}
.css-svjswr {
  opacity: 0.6;
  border-width: 0px 0px 1px;
  border-image: initial;
  border-color: inherit;
  border-style: solid;
  width: 100%;
}

.css-1axrokg {
  width: 20px;
  height: 20px;
  display: inline-block;
  line-height: 1em;
  flex-shrink: 0;
  color: #31c27c;
  vertical-align: middle;
}

.css-11pnfhj > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0px;
  margin-bottom: 0px;
}
.css-140s4nj {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  padding-inline-start: 1.25rem;
  padding-inline-end: 1.25rem;
}
.css-11pnfhj > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0px;
  margin-bottom: 0px;
}
.css-axp06i {
  display: flex;
  -webkit-box-align: baseline;
  align-items: flex-start;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
}
.css-1wyile6 {
  color: #718096;
}
.css-1acsc96 {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background: rgb(14, 181, 94);
  color: rgba(255, 255, 255, 0.92);
}
.css-11pnfhj > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0px;
  margin-bottom: 0px;
}
.css-6ey7w3 {
  width: 1.5rem;
  height: 1.5rem;
  display: inline-block;
  line-height: 1em;
  flex-shrink: 0;
  color: currentcolor;
}

.css-722v25 {
  margin-left: 10px;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}
/* 底部消退 */
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.2s ease-out, transform 0.25s ease-out;
}

.slide-bottom-enter-from {
  opacity: 0;
  transform: translateY(-2%);
}

.slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(2%);
}

@keyframes pulse-200b62b6 {
  0% {
    box-shadow: 0 0 rgba(115, 227, 94, 0.65);
  }
  70% {
    box-shadow: 0 0 0 10px #1cd67c00;
  }
  100% {
    box-shadow: 0 0 #1cd67c00;
  }
}
</style>