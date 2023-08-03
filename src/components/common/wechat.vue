<template>
  <a-modal
      :open="visible"
      title="需要帮助？请联系我们"
      :width="320"
      @update:visible="updateVisible"
      :footer="null"
  >
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 35px">
      <a-qrcode
          :size="size"
          :icon-size="size / 6"
          error-level="H"
          :value="text"
          icon="/assets/wechat.png"
      />
      <div style="margin-top: 15px; text-align: center">欢迎体验我们网站，微信搜索"<span style="color: #31c27c">Spotify注册服务</span>"，即可在手机上使用</div>
      <div style="margin-top: 5px; text-align: center">Spotify交流群：533143917</div>
      <a-button type="primary" :href="text" block style="margin-top: 15px">点击联系客服</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import AQrcode from "ant-design-vue/es/qrcode";

const loading = ref(false);

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const size = ref<number>(200)
const text = ref<string>('https://work.weixin.qq.com/kfid/kfc49c7cba32396dddc');
</script>

<style scoped>

</style>