<template>
  <a-modal
      :open="visible"
      :closable="false"
      width="320px"
      @update:visible="updateVisible"
  >
    <div style="display: flex; align-items: center; justify-content: center;">
      <img src="/assets/spotify-logo-full.svg" style="width: 150px; text-align: center">
    </div>
    <a-divider>全自动开通无需等待</a-divider>
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
      <n-scrollbar style="max-height: 240px; background-color: rgb(247, 247, 247); border: 1px solid rgb(237 237 237); border-radius: 8px;">
        <div class="context">
          <p style="font-size: 16px; font-weight: bold; color: #131313">开通流程：</p>
          <p><span style="color: #31c27c; font-weight: bold">选择下方付款方式进行付费</span>，付费完成后个人中心找到车票信息，点击右边的加入家庭组，然后提交Spotify账号等待30秒系统将自动为您开通完成。</p>
          <p style="font-size: 16px; font-weight: bold; margin-top: 5px; color: #131313">账号详情：</p>
          <p>主账户是土耳其付费，价格相对便宜，是多数人上车人的选择，歌曲有推荐菲律宾当地排名。</p>
          <p>其他地区的账户也可以上车，我们平台提供自动换区到自动开通服务，您无需担心地区问题。</p>
          <p>主账户已经预付费一整年，不用担心出现12个月限制，可以放心上车，如有需要可以提供收据等。</p>
          <p>如果账户有12个月限制也不用担心，可以先联系客服重置账户，不更改原有账号密码，保留原来账户的歌单，喜欢的歌手等，无痕切换。</p>
          <p style="font-size: 16px; font-weight: bold; margin-top: 5px; color: #131313">注意：</p>
          <p>如果在加入过程中出现错误或居住地址不一致、12个月限制等可以联系客服处理。</p>
        </div>
      </n-scrollbar>
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; align-items: flex-end;">
        <div class="chakra-stack css-7k73f3">
          <p class="chakra-text css-zyb6lv">￥{{ classify.money }}</p>
          <p class="chakra-text css-1m7lrag">{{ classify.unit }}</p>
        </div>
        <div style="display: flex; align-items: center; font-size: 16px; line-height: 1.2; margin-right: 5px">
          <svg viewBox="0 0 1028 1024" xmlns="http://www.w3.org/2000/svg" width="13" height="13">
            <path d="M546.816 1.024q99.328 0 186.88 37.888t152.576 102.912 102.912 152.576 37.888 186.88-37.888 186.88-102.912 152.576-152.576 102.4-186.88 37.376q-88.064 0-166.4-29.696t-141.824-81.92l116.736-248.832q21.504 34.816 39.936 64.512 15.36 25.6 30.72 48.64t21.504 31.232q11.264 14.336 20.992 26.624t27.136 14.336q21.504 3.072 30.72-7.68t20.48-28.16q3.072-4.096 11.776-21.504t20.992-43.008 27.648-56.832 30.72-64q35.84-75.776 79.872-168.96l108.544 58.368-44.032-316.416-278.528 171.008 121.856 41.984-129.024 265.216q-29.696-48.128-51.2-83.968-9.216-15.36-17.92-29.184t-14.848-24.064l-9.216-15.36q4.096 8.192 0.512 2.56t-11.776-15.872-18.432-20.48-19.456-10.24q-23.552 0-33.792 11.776t-16.384 27.136q-2.048 4.096-10.24 22.016t-21.504 44.544-28.672 59.392l-32.768 63.488q-15.36 32.768-29.696 62.464t-24.576 50.176q-43.008-59.392-66.048-130.048t-23.04-148.48q0-99.328 37.376-186.88t102.4-152.576 152.576-102.912 186.88-37.888z" fill="#515151"></path>
          </svg>
          <span style="margin-left: 5px; color: rgb(81, 81, 81);">{{ classify.soldNumber }}</span>
        </div>
      </div>
    </div>
    <template #footer>
      <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%; margin-top: 10px">
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
  <open-buy-qrcode v-model:visible="showPayQrcode" :payment="payCurrent"/>
</template>

<script setup lang="ts">
import {AlipayCircleOutlined, WechatOutlined} from '@ant-design/icons-vue';
import {AlipayResult} from "@/api/payment/model";
import {message} from "ant-design-vue";
import {createTicketPayment} from "@/api/premium/ticket-orders";
import {TicketPaymentParam} from "@/api/premium/ticket-orders/model";
import OpenBuyQrcode from "./open-buy-qrcode.vue";
import {Classify} from "@/api/premium/classify/model";

// 提交状态
const loadingAlipay = ref(false);
const loadingWxpay = ref(false);

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
  // 套餐类型
  classify?: Classify;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const params = ref<TicketPaymentParam>({
  paymentType: undefined,
  classifyId: undefined,
  transactionType: 1
})

/* 打开支付 */
const showPayQrcode = ref(false)
// 当前编辑数据
const payCurrent = ref<AlipayResult | null>(null);

/* 确定支付 */
const handleOk = (value: string) => {
  params.value.classifyId = props.classify.id;
  if (value === 'wxpay') {
    params.value.paymentType = 'wxpay';
    loadingWxpay.value = true;
  } else if (value === 'alipay') {
    params.value.paymentType = 'alipay';
    loadingAlipay.value = true;
  }
  setTimeout(() => {
    createTicketPayment(params.value).then((d) => {
      if (value === 'wxpay') {
        loadingWxpay.value = false;
        openUrl(d.paymentLink as string);
      } else if (value === 'alipay') {
        loadingAlipay.value = false;
        showPayQrcode.value = true;
        payCurrent.value = d;
        updateVisible(false);
      }
    }).catch((error) => {
      message.error(error.message);
      loadingAlipay.value = false;
      loadingWxpay.value = false;
    });
  }, 500);
  console.log(params.value)
};

/* 打开支付链接 */
const openUrl = (url: string) => {
  location.href = url;
}

watch(() => props.visible, (visible) => {
  if (!visible) {
    loadingAlipay.value = false;
    loadingWxpay.value = false;
  }
})
</script>

<style scoped lang="less">
.context {
  font-size: 14px;
  font-weight: 400;
  color: #718096;
  padding: 15px;
  display: flex;
  -webkit-box-align: center;
  flex-direction: column;
  gap: 5px;
}

.css-7k73f3 {
  display: flex;
  -webkit-box-align: baseline;
  -webkit-box-pack: start;
  flex-direction: row;
  margin-top: 15px;
  align-items: center;
  line-height: 1.2;
}

.css-7k73f3 > :not(style) ~ :not(style) {
  margin-inline: 0.5rem 0px;
}

.css-zyb6lv {
  font-size: 16px;
  color: #F56C6C;
  font-weight: 700;
}

.css-1m7lrag {
  font-size: 12px;
  color: #718096;
}

.account-text {
  font-size: 15px;
  margin-bottom: 10px;
  text-align: center;
}
</style>