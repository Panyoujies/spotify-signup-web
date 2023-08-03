<template>
  <a-drawer
      title="登录/注册"
      width="100%"
      height="auto"
      :closable="false"
      :placement="placement"
      :open="visible"
      @close="updateVisible(false)"
      class="bomaos-safe-area-bottom"
  >
    <template #extra>
      <router-link to>用户协议?</router-link>
    </template>
    <div class="login-wrapper">
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
  </a-drawer>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import {DrawerProps, FormInstance, message} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import {goHomeRoute} from '@/utils/page-tab-util';
import {getWechatAuthLogin, login, sendEmailCode} from '@/api/member';
import {SafetyCertificateOutlined, UserOutlined, WechatOutlined} from '@ant-design/icons-vue';
import {Rule} from "ant-design-vue/es/form";
import {EmailParam} from "@/api/member/model";
import {useAuthStore} from "@/store/modules/authStore";
import {useMemberStore} from "@/store/modules/member";
import {useBasicLayout} from "@/hooks/useBasicLayout";
import {useTooltipStore} from "@/store/modules/useTooltipStore";
import {messageLoading} from "@/utils/message-loading";

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

const placement = ref<DrawerProps['placement']>('bottom');

const { isMobile } = useBasicLayout();

//
const formRef = ref<FormInstance | null>(null);

const {currentRoute} = useRouter();

// 加载状态
const loading = ref(false);

// 表单数据
const form = reactive({
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
    tooltipStore.openTooltip(true);
  }
})
</script>

<style scoped lang="less">
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


</style>