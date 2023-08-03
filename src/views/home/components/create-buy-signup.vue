<template>
  <a-modal
      :open="visible"
      width="300px"
      :closable="false"
      @update:visible="updateVisible"
  >
    <div class="chakra-stack css-7k73f3">
      <p class="chakra-text css-zyb6lv">￥5.99</p>
      <p class="chakra-text css-1m7lrag">已售出: {{ salesCount }}</p>
    </div>
    <a-divider>购买说明</a-divider>
    <n-scrollbar style="max-height: 240px; background-color: rgb(247, 247, 247); border: 1px solid rgb(237 237 237); border-radius: 8px;">
      <div class="context">
        <p>Spotify注册码</p>
        <p>一键自动注册</p>
        <p>自动发货邮件提醒</p>
        <p>提供本次Spotify注册</p>
        <p>全程仅需3秒、不成功包退款。</p>
      </div>
    </n-scrollbar>
    <template #footer>
      <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%; margin-top: 15px">
        <a-button :style="{background: '#51c332', borderColor: '#51c332', color: '#fff'}" block size="large" :loading="loadingWxpay" :disabled="loadingWxpay" @click="handleOk('wxpay')">
          <template #icon>
            <wechat-outlined />
          </template>
          微信
        </a-button>
        <a-button :style="{background: '#2facff', borderColor: '#2facff', color: '#fff', marginLeft: '0px'}" block size="large" :loading="loadingAlipay" :disabled="loadingAlipay" @click="handleOk('alipay')">
          <template #icon>
            <alipay-circle-outlined />
          </template>
          支付宝
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import {message} from "ant-design-vue/es";
import {faceToFace} from "@/api/payment";
import {AlipayResult, PaymentParam} from "@/api/payment/model";
import {AlipayCircleOutlined, WechatOutlined} from '@ant-design/icons-vue';
import {getSalesCount} from "@/api/signup";

const salesCount = ref<Number>(0)

// 提交状态
const loadingAlipay = ref(false);
const loadingWxpay = ref(false)
const emit = defineEmits<{
  (e: 'done', payment: AlipayResult): void;
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

const params = ref<PaymentParam>({
  paymentType: undefined,
  orderType: 0 // 注册码购买
})

/* 确定支付 */
const handleOk = (value: string) => {
  if (value === 'wxpay') {
    /*message.warning('微信支付暂时下线、请使用支付宝支付')
    return;*/
    loadingWxpay.value = true;
  } else if (value === 'alipay') {
    loadingAlipay.value = true;
  }
  setTimeout(() => {
    if (value === 'wxpay') {
      params.value.paymentType = 'wxpay';
    } else if (value === 'alipay') {
      params.value.paymentType = 'alipay';
    }
    faceToFace(params.value).then((d) => {
      if (value === 'wxpay') {
        loadingWxpay.value = false;
        openUrl(d.paymentLink as string);
        updateVisible(false);
      } else if (value === 'alipay') {
        loadingAlipay.value = false;
        updateVisible(false);
        emit('done', d);
      }
    }).catch((error) => {
      message.error(error.message);
      loadingAlipay.value = false;
      loadingWxpay.value = false;
      updateVisible(false);
    })
  }, 500);
};

/* 打开支付链接 */
const openUrl = (url: string) => {
  location.href = url;
}

onMounted(() => {
  getSalesCount().then((d) => {
    salesCount.value = d.count as number;
  }).catch((error) => {
    salesCount.value = 0;
  })
})
</script>

<style scoped>
.css-7k73f3 {
  display: flex;
  -webkit-box-align: baseline;
  align-items: flex-end;
  -webkit-box-pack: start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
}

.css-zyb6lv {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1;
}

.css-1m7lrag {
  font-size: 0.875rem;
  color: #718096;
}

.css-7k73f3 > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0.5rem 0px;
  margin-bottom: 0px;
}

.context {
  font-size: 14px;
  font-weight: 400;
  color: #718096;
  padding: 15px;
  display: flex;
  -webkit-box-align: center;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

</style>