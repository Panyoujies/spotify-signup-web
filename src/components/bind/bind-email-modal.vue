<template>
  <a-modal
      :open="visible"
      title="绑定邮箱号"
      width="320px"
      :confirm-loading="loading"
      @update:visible="updateVisible"
      :footer="null"
  >
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
                :disabled="!!countdownTime"
                @click="openImgCodeModal"
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
          绑定邮箱
        </a-button>
      </a-form>
    </div>
  </a-modal>
  <!-- 编辑弹窗 -->
  <a-modal
      :width="320"
      :footer="null"
      title="发送验证码"
      v-model:open="visibleEmail"
  >
    <div class="login-input-group" style="margin-bottom: 16px; margin-top: 25px">
      <a-input
          v-model:value="imgCode"
          placeholder="请输入图形验证码"
          allow-clear
          size="large"
      />
      <a-button class="login-captcha" @click="changeCaptcha">
        <img v-if="captcha" :src="captcha" alt="" />
      </a-button>
    </div>
    <a-button
        block
        size="large"
        type="primary"
        :loading="codeLoading"
        :disabled="codeLoading"
        @click="sendCode"
    >
      立即发送
    </a-button>
  </a-modal>
</template>

<script setup lang="ts">
import {computed, reactive, ref} from 'vue';
import {FormInstance, message} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import {bindEmail, getCaptcha, sendEmailCode} from '@/api/member';
import {SafetyCertificateOutlined, UserOutlined} from '@ant-design/icons-vue';
import {Rule} from "ant-design-vue/es/form";
import {EmailParam} from "@/api/member/model";
import {useAuthStore} from "@/store/modules/authStore";
import {useMemberStore} from "@/store/modules/member";
import {useBasicLayout} from "@/hooks/useBasicLayout";

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

// 是否显示图形验证码弹窗
const visibleEmail = ref(false);

// 图形验证码
const imgCode = ref('');

// 发送验证码按钮loading
const codeLoading = ref(false);

// 验证码倒计时时间
const countdownTime = ref(0);

// 验证码 base64 数据
const captcha = ref('');

// 验证码内容, 实际项目去掉
const text = ref('');

// 验证码倒计时定时器
let countdownTimer: number | null = null;

/* 获取图形验证码 */
const changeCaptcha = () => {
  // 这里演示的验证码是后端返回base64格式的形式, 如果后端地址直接是图片请参考忘记密码页面
  getCaptcha()
      .then((data) => {
        captcha.value = data.base64;
        // 实际项目后端一般会返回验证码的key而不是直接返回验证码的内容, 登录用key去验证, 你可以根据自己后端接口修改
        text.value = data.text;
        formRef.value?.clearValidate();
      })
      .catch((e) => {
        message.error(e.message);
      });
};

const emailParam = ref<EmailParam>({
  sendType: 'bind',
  email: undefined
})

/* 显示发送短信验证码弹窗 */
const openImgCodeModal = () => {
  if (!form.email) {
    message.error('请输入邮箱号码');
    return;
  }
  emailParam.value.email = form.email;
  imgCode.value = '';
  changeCaptcha();
  visibleEmail.value = true;
};

/* 发送短信验证码 */
const sendCode = () => {
  if (!imgCode.value) {
    message.error('请输入图形验证码');
    return;
  }
  if (imgCode.value.toLowerCase() !== text.value) {
    message.error('验证码错误');
    return;
  }
  codeLoading.value = true;
  sendEmailCode(emailParam.value).then(() => {
    message.success('邮件验证码发送成功, 请注意查收!');
    visibleEmail.value = false;
    codeLoading.value = false;
    countdownTime.value = 30;
    // 开始对按钮进行倒计时
    countdownTimer = window.setInterval(() => {
      if (countdownTime.value <= 1) {
        countdownTimer && clearInterval(countdownTimer);
        countdownTimer = null;
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

const memberStore = useMemberStore();

/* 提交 */
const submit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value.validate().then(() => {
    loading.value = true;
    bindEmail(form)
        .then((msg) => {
          message.success(msg);
          memberStore.fetchMemberInfo();
          updateVisible(false);
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
  });
};
</script>

<style scoped lang="less">
.login-wrapper {
  margin-top: 25px;
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


</style>