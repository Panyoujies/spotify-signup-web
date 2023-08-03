<template>
  <div style="margin: 15px 0">
    <div class="bomaos-container" >
      <a-row :gutter="[15, 15]">
        <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
          <a-card title="商品介绍" :bordered="false">
            <template #extra>
              <a-tag color="blue">自动发货</a-tag>
            </template>
            <div :style="{display: 'flex'}">
              <div v-if="!isMobile" style="width: 240px; height: 160px; margin-right: 15px">
                <a-image
                    style="display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 8px"
                    :height="160"
                    :width="240"
                    :src="product?.cover"
                    :preview="false"
                />
              </div>
              <div style="width: 100%">
                <div class="weui-cells">
                  <div class="weui-cell">
                    <div class="weui-cell__bd">商品名称</div>
                    <div class="weui-cell__ft">{{ product?.name }}</div>
                  </div>
                  <div class="weui-cell">
                    <div class="weui-cell__bd">商品单价</div>
                    <div class="weui-cell__ft">{{ product?.money }}</div>
                  </div>
                  <div class="weui-cell-bottom">
                    <div class="weui-cell__bd">商品库存</div>
                    <div class="weui-cell__ft">{{ product?.cardType == 0 ? product?.stockNumber : '库存充足' }}</div>
                  </div>
                </div>
              </div>
            </div>
            <template v-if="product.prompt" #actions>
              <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%; padding: 0 24px">
                <div style="display: flex; align-items: center; font-size: 15px;">
                  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="17" height="17">
                    <path d="M512 0.021489c-282.758945 0-511.978511 229.219565-511.978511 511.978511s229.219565 511.978511 511.978511 511.978511c282.752806 0 511.978511-229.219565 511.978511-511.978511S794.752806 0.021489 512 0.021489zM650.535193 799.341311c-30.110785 10.406001-53.770648 18.430768-71.779813 24.12035-17.759479 5.683443-38.609343 8.524141-62.269205 8.524141-36.280298 0-64.599274-8.057513-84.656075-23.679305-20.332071-16.089443-30.366611-35.953863-30.366611-60.573587 0-9.465582 0.76748-18.936281 2.297322-28.869514 1.567705-9.93221 4.121877-21.304212 7.225565-33.617655l37.547151-118.810966c3.353374-11.340279 1.453095-21.74628 3.78828-32.177863 2.316765-9.93221 3.333932-19.397792 3.333932-27.429723 0-15.647375 1.433652-26.053376-5.528923-31.742958-7.219425-6.15007-20.312628-4.383844-40.139186-4.383844-9.804297 0-19.832697 1.408069-29.854958 3.776-10.290367 2.847861-19.032472 0.607844-26.251897 3.455705l10.060123-36.926004c24.427342-8.997931 48.087205-16.562211 70.499657-22.719444 22.39301-6.617721 43.722804-9.458419 63.549362-9.458419 36.274158 0 64.09376 7.583722 83.631746 23.205515 19.551288 15.621792 41.169655 35.960003 41.169655 60.579727 0 5.215792-0.800225 14.213723-2.080382 27.461445-1.274016 12.773931-3.858888 24.613584-7.468089 35.486212L563.843762 673.880901c-2.847861 9.465582-5.65786 20.363793-7.986905 32.677237-2.585895 11.839653-3.858888 21.304212-3.858888 27.455305 0 15.621792 4.114714 26.494421 11.845793 32.184003 7.980765 5.65786 21.618367 8.498558 40.900525 8.498558 9.011234 0 19.321044-1.408069 30.878265-4.224208 11.564383-2.841721 19.800975-5.215792 24.946159-7.589862L650.535193 799.341311zM643.860167 319.355445c-17.240663 14.681374-38.315654 21.771863-62.768579 21.771863-24.434505 0-45.540196-7.090489-63.305815-21.771863-17.496489-14.213723-26.238594-31.710212-26.238594-52.547797 0-20.369933 8.742105-37.893029 26.238594-52.547797 17.765619-14.655791 38.872333-22.245653 63.305815-22.245653 24.421202 0 45.527916 7.55814 62.768579 22.245653 17.496489 14.681374 26.258037 32.209586 26.258037 52.547797C670.118204 287.644209 661.356656 305.141722 643.860167 319.355445z" fill="#31c27c" ></path>
                  </svg>
                  <div style="color: #4d4d4d; margin-left: 8px">{{ product.prompt }}</div>
                </div>
              </div>
            </template>
          </a-card>
          <a-card title="商品详情" :bordered="false" style="margin-top: 15px;" :bodyStyle="{ minHeight: 'calc(100vh - 553px)' }">
            <template #extra>
              请详细阅读如下说明
            </template>
            <div class="markdown-body" v-html="text"></div>
          </a-card>
        </a-col>
        <a-col v-if="!isMobile" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-card title="购买须知" :bordered="false" class="sticky">
              <n-scrollbar style="max-height: 220px; background-color: rgb(247, 247, 247); border: 1px solid rgb(237 237 237); border-radius: 8px;">
                <div class="context">
                  <p>1. 本商品为虚拟数字账号，一旦购买恕不退款，敬请谅解。</p>
                  <p>2. 除非特别说明，我们所有出售的账号均可正常使用和登录，绝无二次售卖。</p>
                  <p>3. 在购买前，请认真阅读商品描述中「商品详情」段落，了解如何使用本商品。</p>
                  <p>4. 我们提供使用指导或技术问题支持，如有账号登录或加入的问题，请点击右下角客服按钮获得在线支持。</p>
                </div>
              </n-scrollbar>
              <div style="display: flex; align-items: center; margin-top: 15px">
                <svg viewBox="0 0 1025 1024" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
                  <path d="M187.732004 156.526779c-13.330296-13.331627-34.948251-13.331627-48.263899 0-13.335622 13.326301-13.335622 34.937598 0 48.274552l48.263899 48.263899c13.331627 13.331627 34.933604 13.331627 48.269226 0 13.326301-13.326301 13.326301-34.932272 0-48.263899L187.732004 156.526779 187.732004 156.526779 187.732004 156.526779zM836.261339 156.526779l-48.269226 48.274552c-13.326301 13.331627-13.326301 34.937598 0 48.263899 13.315648 13.331627 34.932272 13.331627 48.269226 0l48.258573-48.263899c13.336953-13.336953 13.336953-34.942925 0-48.274552C871.194942 143.200478 849.592966 143.200478 836.261339 156.526779L836.261339 156.526779 836.261339 156.526779zM102.402665 426.66267 34.139994 426.66267C15.28903 426.66267 0.002666 441.945039 0.002666 460.789345c0 18.854958 15.28237 34.137328 34.137328 34.137328l68.262672 0c18.850963 0 34.132002-15.28237 34.132002-34.137328C136.534667 441.945039 121.253629 426.66267 102.402665 426.66267L102.402665 426.66267 102.402665 426.66267zM989.85468 426.66267l-68.264003 0c-18.849632 0-34.137328 15.28237-34.137328 34.126675 0 18.854958 15.286364 34.137328 34.137328 34.137328l68.264003 0c18.849632 0 34.142654-15.28237 34.142654-34.137328C1023.997334 441.945039 1008.704312 426.66267 989.85468 426.66267L989.85468 426.66267 989.85468 426.66267zM477.862672 34.132002l0 68.264003c0 18.854958 15.28237 34.13067 34.132002 34.13067 18.844306 0 34.137328-15.275712 34.137328-34.13067L546.132002 34.132002C546.132002 15.28237 530.838979 0 511.994674 0 493.145042 0 477.862672 15.28237 477.862672 34.132002L477.862672 34.132002 477.862672 34.132002zM273.066668 511.992008c0-131.955413 106.967267-238.928006 238.928006-238.928006 131.960739 0 238.933332 106.972593 238.933332 238.928006 0 131.960739-106.972593 238.937327-238.933332 238.937327C380.033935 750.929335 273.066668 643.951415 273.066668 511.992008L273.066668 511.992008 273.066668 511.992008zM204.803996 511.992008c0 169.675982 137.525348 307.211982 307.190677 307.211982S819.190677 681.667989 819.190677 511.992008c0-169.665329-137.530675-307.190677-307.196004-307.190677S204.803996 342.326679 204.803996 511.992008L204.803996 511.992008 204.803996 511.992008zM443.730671 989.862667c0 18.838979 15.28237 34.137328 34.132002 34.137328l68.269329 0c18.849632 0 34.132002-15.297017 34.132002-34.137328 0-18.860284-15.28237-34.132002-34.132002-34.132002l-68.269329 0C459.01304 955.730665 443.730671 971.002382 443.730671 989.862667L443.730671 989.862667 443.730671 989.862667zM375.467999 887.466662c0 18.834985 15.281038 34.132002 34.126675 34.132002l204.799999 0c18.849632 0 34.132002-15.297017 34.132002-34.132002 0-18.865611-15.28237-34.142654-34.132002-34.142654L409.594674 853.324008C390.743711 853.325339 375.467999 868.601051 375.467999 887.466662L375.467999 887.466662 375.467999 887.466662zM375.467999 887.466662" fill="#272636"></path>
                </svg>
                <div style="margin-left: 5px; color: #272636">付款完成，前往个人中心查看订单</div>
              </div>
              <template #actions>
                <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%; padding: 10px 24px">
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
            </a-card>
        </a-col>
      </a-row>
    </div>
    <div v-if="isMobile" class="buy-btn-group bomaos-safe-area-bottom" style="background-color: #FFFFFF; box-shadow: rgb(169 169 169 / 20%) 0px 0px 10px 5px;">
      <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%; padding: 15px 20px;">
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
    </div>
    <open-buy-qrcode v-model:visible="showPayQrcode" :payment="payCurrent"/>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {AlipayCircleOutlined, WechatOutlined} from '@ant-design/icons-vue';
import {getProduct} from "@/api/commodity/product";
import {Product} from "@/api/commodity/product/model";
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import '@/styles/lib/style.less';
import 'katex/dist/katex.min.css';
import '@/styles/lib/tailwind.css';
import '@/styles/lib/highlight.less';
import '@/styles/lib/github-markdown.less';
import {AlipayResult, PaymentParam} from "@/api/payment/model";
import {createPayment} from "@/api/payment";
import {message} from "ant-design-vue";
import OpenBuyQrcode from "./components/open-buy-qrcode.vue";
import {useBasicLayout} from "@/hooks/useBasicLayout";

const { params } = useRoute();
const { isMobile } = useBasicLayout()

// 提交状态
const loadingAlipay = ref(false);
const loadingWxpay = ref(false)

const paymentParams = ref<PaymentParam>({
  paymentType: undefined,
  productId: undefined
})

/* 打开支付 */
const showPayQrcode = ref(false)
// 当前编辑数据
const payCurrent = ref<AlipayResult | null>(null);

/* 确定支付 */
const handleOk = (value: string) => {
  paymentParams.value.productId = params.id as unknown as number;
  if (value === 'wxpay') {
    loadingWxpay.value = true;
  } else if (value === 'alipay') {
    loadingAlipay.value = true;
  }
  setTimeout(() => {
    if (value === 'wxpay') {
      paymentParams.value.paymentType = 'wxpay';
    } else if (value === 'alipay') {
      paymentParams.value.paymentType = 'alipay';
    }
    createPayment(paymentParams.value).then((d) => {
      if (value === 'wxpay') {
        loadingWxpay.value = false;
        openUrl(d.paymentLink as string);
      } else if (value === 'alipay') {
        loadingAlipay.value = false;
        showPayQrcode.value = true;
        payCurrent.value = d;
      }
    }).catch((error) => {
      message.error(error.message);
      loadingAlipay.value = false;
      loadingWxpay.value = false;
    });
  }, 500);
};

/* 打开支付链接 */
const openUrl = (url: string) => {
  location.href = url;
}

const product = ref<Product>({});

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

const text = computed(() => {
  const value = product.value.content ?? ''
  return mdi.render(value)
})

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

onMounted(() => {
  getProduct(params.id as unknown as number).then((d) => {
    product.value = d;
  })
})
</script>

<style scoped lang="less">
:deep(.ant-tag) {
  margin-inline-end: 0px;
}

.weui-cells {
  margin-top: 0;
  background-color: #f7f7f7;
  line-height: 1.41176471;
  font-size: 17px;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
  border: 1px solid #ededed;

  .weui-cell {
    padding: 14px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: flex-start;
    border-bottom: 1px solid #ededed;

    .weui-cell__bd {
      min-width: 4em;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }

    .weui-cell__ft {
      margin-left: 15px;
      font-weight: normal;
      text-align: right;
      color: rgba(0, 0, 0, 0.5);
      color: var(--weui-FG-1);
    }
  }

  .weui-cell-bottom {
    padding: 14px 15px;
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: flex-start;

    .weui-cell__bd {
      min-width: 4em;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }

    .weui-cell__ft {
      font-weight: normal;
      text-align: right;
      color: rgba(0, 0, 0, 0.5);
      color: var(--weui-FG-1);
    }
  }
}

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

@media screen and (max-width: 750px) {
  .buy-btn-group {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    border-top: 1px solid #eeeeee;
    border-radius: 0;
    -webkit-backdrop-filter: saturate(5) blur(20px);
    backdrop-filter: saturate(5) blur(20px);
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>