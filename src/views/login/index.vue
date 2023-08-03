<template>
  <div class="login-wrapper">
    <div class="chakra-container css-1fdzo6q">
      <router-link to="/">
        <div class="css-1k9efnl">
          <img src="/spotify.svg" class="chakra-image css-wiyux6">
          <p class="chakra-text css-vmu0l4">Spotify 注册</p>
        </div>
      </router-link>
    </div>
    <a-form
        ref="formRef"
        layout="vertical"
        :model="form"
        :rules="rules"
        class="login-form bomao-bg-white"
    >
      <h4>登录 / 注册</h4>
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
      <a-form-item>
        <a-button
            block
            size="large"
            type="primary"
            :loading="loading"
            @click="submit"
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 编辑弹窗 -->
    <a-modal
        :width="340"
        :footer="null"
        title="发送验证码"
        v-model:open="visible"
    >
      <div class="login-input-group" style="margin-bottom: 16px">
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
  </div>
</template>

<script setup lang="ts">
import {computed, reactive, ref, unref} from 'vue';
import {FormInstance, message} from 'ant-design-vue';
import {getToken} from '@/utils/token-util';
import {useRouter} from 'vue-router';
import {goHomeRoute} from '@/utils/page-tab-util';
import {getCaptcha, login, sendEmailCode} from '@/api/member';
import {SafetyCertificateOutlined, UserOutlined} from '@ant-design/icons-vue';
import {Rule} from "ant-design-vue/es/form";
import {EmailParam} from "@/api/member/model";

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
const visible = ref(false);

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
  sendType: 'login',
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
  visible.value = true;
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
    visible.value = false;
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

/* 跳转到首页 */
const goHome = () => {
  const { query } = unref(currentRoute);
  goHomeRoute(query.from as string);
};

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
          goHome();
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
  });
};

if (getToken()) {
  goHome();
}
</script>

<style scoped lang="less">
.ant-card-head-wrapper .ant-card-head-title {
  font-size: 26px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #1d2a3a;
  padding: 28px 0 24px;
  text-align: center;
}

.login-wrapper {
  padding: 50px 0 0;
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: cover;
}

body h4 {
  font-size: 20px;
}

.login-form h4 {
  padding: 22px 0;
  text-align: center;
}

.login-form {
  width: 360px;
  margin: 0 auto;
  max-width: 100%;
  padding: 0 28px;
  box-sizing: border-box;
  position: relative;
  z-index: 2;
  margin-top: 25px;
}

.login-input-group .login-captcha > img {
  width: 100%;
  height: 100%;
}

body .bomao-text-center {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

body .bomao-text-center a {
  line-height: 26px;
}

body .bomao-pull-right {
  float: right;
}

.css-1fdzo6q {
  width: 100%;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 25px;
}

.css-1k9efnl {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 8px;
}

.css-wiyux6 {
  width: 40px;
  height: 40px;
}

.css-vmu0l4 {
  font-size: 25px;
  font-weight: 700;
  color: rgb(74, 85, 104);
}

@media screen and (min-width: 30em) {
  .css-vmu0l4 {
    font-size: 20px;
  }
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
</style>