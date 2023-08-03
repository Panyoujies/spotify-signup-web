<template>
  <a-modal
      :open="visible"
      width="690px"
      :closable="false"
      :confirm-loading="loading"
      @update:visible="updateVisible"
      :style="{padding: '0'}"
      :footer="null"
  >
    <div class="card_body">
      <div class="login-cover">
        <n-carousel draggable autoplay :loop="true" :interval="4000" style="border-radius: 8px;">
          <div class="flex h-full">
            <div class="m-auto text-center dark:text-white">
              <img class="inline-block w-[260px]" src="/assets/banner-1.png" alt="快速注册" style="-webkit-user-drag: none;">
              <h1 class="mb-2 mt-2 text-xl font-bold">极速注册</h1>
              <p class="text-slate-500">极速注册，快速体验Spotify注册服务</p>
            </div>
          </div>
          <div class="flex h-full">
            <div class="m-auto text-center dark:text-white">
              <img class="inline-block w-[260px]" src="/assets/banner-3.png" alt="解锁14天" style="-webkit-user-drag: none;">
              <h1 class="mb-2 mt-2 text-xl font-bold">解锁14天</h1>
              <p class="text-slate-500">提供稳定靠谱的解除14天地区限制</p>
            </div>
          </div>
          <div class="flex h-full">
            <div class="m-auto text-center dark:text-white">
              <img class="inline-block w-[260px]" src="/assets/banner-2.png" alt="开通会员" style="-webkit-user-drag: none;">
              <h1 class="mb-2 mt-2 text-xl font-bold">开通会员</h1>
              <p class="text-slate-500">无需等待，全自动会员开通</p>
            </div>
          </div>
          <template #dots="{ total, currentIndex, to }">
            <div class="n-carousel__dots n-carousel__dots--line">
              <div
                  class="n-carousel__dot"
                  v-for="index of total"
                  :key="index"
                  :class="{ ['n-carousel__dot--active']: currentIndex === index - 1 }"
                  @click="to(index - 1)"
              />
            </div>
          </template>
        </n-carousel>
      </div>
      <div class="login-wrapper">
        <header class="relative mb-4 flex items-center">
          <h1 class="text-3xl font-bold dark:text-white">登录 Spotify注册</h1>
        </header>
        <a-form
            ref="formRef"
            layout="vertical"
            :model="form"
            :rules="rules"
            class="login-form bomao-bg-white"
        >
          <a-form-item label="邮箱" name="email">
            <a-input
                allow-clear
                size="large"
                v-model:value="form.email"
                placeholder="请输入邮箱号码"
            >
              <template #prefix>
                <user-outlined/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="验证码" name="code">
            <div class="login-input-group">
              <a-input
                  placeholder="请输入验证码"
                  v-model:value="form.code"
                  allow-clear
                  size="large"
              >
                <template #prefix>
                  <safety-certificate-outlined />
                </template>
              </a-input>
              <a-button
                  class="login-captcha"
                  :loading="codeLoading"
                  :disabled="codeLoading"
                  @click="sendCode"
              >
                <span v-if="!countdownTime">发送验证码</span>
                <span v-else>已发送 {{ countdownTime }} s</span>
              </a-button>
            </div>
          </a-form-item>
          <a-button
              block
              size="large"
              type="primary"
              :loading="loading"
              @click="submit"
          >
            登录
          </a-button>
        </a-form>
        <div class="bomaos-text-center" v-if="!isMobile">
          <div>其他登录方式</div>
          <wechat-outlined class="login-oauth-icon" style="background: #4daf29" @click="wechatLogin"/>
        </div>
      </div>
    </div>

  </a-modal>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue';
import {FormInstance, message} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import {goHomeRoute} from '@/utils/page-tab-util';
import {getWechatAuthLogin, login, sendEmailCode} from '@/api/member';
import {SafetyCertificateOutlined, UserOutlined, WechatOutlined} from '@ant-design/icons-vue';
import {Rule} from "ant-design-vue/es/form";
import {EmailParam, LoginParam} from "@/api/member/model";
import {useAuthStore} from "@/store/modules/authStore";
import {useMemberStore} from "@/store/modules/member";
import {useBasicLayout} from "@/hooks/useBasicLayout";
import {useTooltipStore} from "@/store/modules/useTooltipStore";
import {messageLoading} from "@/utils/message-loading";
import useFormData from "@/hooks/useFormData";

const emit = defineEmits<{
  (e: 'done', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('done', value);
};

const { isMobile } = useBasicLayout();

//
const formRef = ref<FormInstance | null>(null);

const {currentRoute} = useRouter();

// 加载状态
const loading = ref(false);

// 表单数据
const { form, resetFields } = useFormData<LoginParam>({
  email: '',
  code: '',
  remember: true
});

// 表单验证规则
const rules = computed<Record<string, Rule[]>>(() => {
  return {
    email: [
      {
        required: true,
        message: '请输入邮箱号码',
        type: 'string',
        trigger: 'blur'
      }
    ],
    code: [
      {
        required: true,
        message: '请输入验证码',
        type: 'string',
        trigger: 'blur'
      }
    ]
  };
});

// 发送验证码按钮loading
const codeLoading = ref(false);

// 验证码倒计时时间
const countdownTime = ref(0);

// 验证码倒计时定时器
let countdownTimer: number | null = null;

const emailParam = ref<EmailParam>({
  sendType: 'login',
  email: undefined
})

/* 发送短信验证码 */
const sendCode = () => {
  if (!form.email) {
    message.error('请输入邮箱号码');
    return;
  }
  emailParam.value.email = form.email;
  codeLoading.value = true;
  const hide = messageLoading('验证码发送中...', 0);
  sendEmailCode(emailParam.value).then(() => {
    hide();
    message.success('验证码发送成功、请注意查收!');
    countdownTime.value = 30;
    // 开始对按钮进行倒计时
    countdownTimer = window.setInterval(() => {
      if (countdownTime.value <= 1) {
        countdownTimer && clearInterval(countdownTimer);
        countdownTimer = null;
        codeLoading.value = false;
      }
      countdownTime.value--;
    }, 1000);
  }).catch((error) => {
    message.error(error.message);
    codeLoading.value = false;
  })
};

onBeforeUnmount(() => {
  countdownTimer && clearInterval(countdownTimer);
});

const authStore = useAuthStore();
/* 跳转到首页 */
const goHome = () => {
  goHomeRoute(authStore.redirectTo);
  emit('done', false);
};

const memberStore = useMemberStore();
/* 提交 */
const submit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate().then(() => {
    loading.value = true;
    login(form)
        .then((msg) => {
          message.success(msg);
          memberStore.fetchMemberInfo();
          goHome();
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
  });
};

/* 微信授权登录 */
const wechatLogin = () => {
  getWechatAuthLogin('wechat').then((d) => {
    openUrl(d.authorizeUrl as string);
  })
}

/* 打开链接 */
const openUrl = (url: string) => {
  /*location.href = url;*/
  window.open(url);
}

const tooltipStore = useTooltipStore();

watch(() => props.visible, (visible) => {
  if (visible) {
    tooltipStore.closeTooltip();
  } else {
    resetFields();
    tooltipStore.openTooltip(true);
  }
})
</script>

<style scoped lang="less">
:deep(.css-dev-only-do-not-override-1nvm6tj.ant-modal .ant-modal-content) {
  padding: 0;
}

.login-wrapper {
  width: 300px;
  flex-shrink: 0;
  box-sizing: border-box;
}

.login-form {
  margin-top: 20px;
}
/* 验证码 */
.login-input-group {
  display: flex;
  align-items: center;

  :deep(.ant-input-affix-wrapper) {
    flex: 1;
  }

  .login-captcha {
    width: 102px;
    height: 40px;
    margin-left: 10px;
    padding: 0;

    & > img {
      width: 100%;
      height: 100%;
    }
  }
}

.bomaos-text-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  div {
    font-size: 16px;
  }

  .login-oauth-icon {
    color: #fff;
    padding: 6px;
    font-size: 20px;
    border-radius: 50%;
    cursor: pointer;
  }
}

.card_body {
  display: flex;
  padding: 0;
  justify-content: space-between;
  height: 345px;
  .login-cover {
    width: 320px;
    height: 100%;
  }
}

.flex {
  display: flex;
}

.h-full {
  height: 100%;
}


.m-auto {
  margin: auto;
}
.text-center {
  text-align: center;
}
:is(.dark .dark\:text-white) {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.inline-block {
  display: inline-block;
}
.w-\[260px\] {
  width: 180px;
}

.mb-2 {
  margin-bottom: 0.5rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.font-bold {
  font-weight: 700;
}

.text-slate-500 {
  --tw-text-opacity: 1;
  color: rgb(100 116 139 / var(--tw-text-opacity));
}

.n-carousel {
  position: relative;
  width: 100%;
  height: 100%;
  touch-action: pan-y;
  overflow: hidden;
}

.n-carousel .n-carousel__slides {
  display: flex;
  width: 100%;
  height: 100%;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-property: transform;
}

.n-carousel .n-carousel__slides .n-carousel__slide {
  flex-shrink: 0;
  position: relative;
  width: 100%;
  height: 100%;
  outline: none;
  overflow: hidden;
}

.n-carousel .n-carousel__dots {
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
}

.n-carousel.n-carousel--bottom .n-carousel__dots {
  transform: translateX(-50%);
  bottom: 10px;
  left: 50%;
}

.n-carousel .n-carousel__dots.n-carousel__dots--line .n-carousel__dot {
  border-radius: 9999px;
  width: 16px;
  height: 4px;
  background-color: rgba(87, 76, 76, 0.3);
  cursor: pointer;
  transition: width .3s cubic-bezier(.4, 0, .2, 1), box-shadow .3s cubic-bezier(.4, 0, .2, 1), background-color .3s cubic-bezier(.4, 0, .2, 1);
  outline: none;
}

.n-carousel.n-carousel--bottom .n-carousel__dots.n-carousel__dots--line .n-carousel__dot {
  margin: 0 4px;
}

.n-carousel__dots .n-carousel__dot--active {
  background-color: rgba(0,0,0,.8)!important;
}

</style>