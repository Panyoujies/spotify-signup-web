<template>
  <a-modal
      :open="visible"
      title="支付宝扫一扫"
      width="300px"
      :confirm-loading="loading"
      @update:visible="updateVisible"
      :footer="null"
  >
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center; margin-top: 35px">
      <bomaos-qr-code-svg
          :value="text"
          :size="160"
          :level="level"
          :margin="0"
          :image-settings="image"
      />
      <div style="margin-top: 15px; font-size: 18px; color: #31c27c; font-weight: bold">¥ {{ props.payment.paymentMoney }}</div>
      <div style="margin-top: 5px">订单已创建、请尽快支付完成。</div>
      <a-button v-if="isMobile" type="primary" :href="text" block style="margin-top: 15px">唤醒支付宝APP支付</a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {AlipayResult} from "@/api/payment/model";
import type {ImageSettings, LevelType} from '@/plugin/bomaos-qr-code/types';
import BomaosQrCodeSvg from "@/plugin/bomaos-qr-code-svg/index";
import {message} from "ant-design-vue/es";
import {useRouter} from "vue-router";
import {paymentTicketOrderStatus} from "@/api/premium/ticket-orders";
import {useBasicLayout} from "@/hooks/useBasicLayout";

const { isMobile } = useBasicLayout()
const { push } = useRouter();

// 提交状态
const loading = ref(false);
const timer = ref();

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
  payment?: AlipayResult;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  timer.value && clearInterval(timer.value);
  emit('update:visible', value);
};

const text = ref<string>();
const IMAGE_SRC = '/assets/alipay.png';
const level = ref<LevelType>('L');
const image = reactive<ImageSettings>({
  src: IMAGE_SRC,
  width: 25,
  height: 25,
  x: undefined,
  y: undefined,
  excavate: false
});

onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value);
});

watch(() => props.visible, (visible) => {
  if (visible) {
    text.value = props.payment.paymentLink;
    timer.value = setInterval(() => {
      paymentTicketOrderStatus(props.payment.paymentOrderId).then((d) => {
        message.success(d);
        timer.value && clearInterval(timer.value);
        updateVisible(false);
        push('/user')
      }).catch((error) => {
        console.log(error.message);
      });
    }, 1000);
  }
})
</script>

<style scoped>

</style>