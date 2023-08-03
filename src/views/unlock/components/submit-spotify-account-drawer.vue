<template>
  <a-drawer
      title="提交Spotify账号"
      width="100%"
      height="auto"
      :closable="false"
      :placement="placement"
      :open="visible"
      @close="updateVisible(false)"
      class="bomaos-safe-area-bottom"
  >
    <template #extra>
      <div style="font-size: 14px; color: rgb(97 97 97)">提交后解锁所有功能</div>
    </template>
    <div style="width: 100%;">
      <a-form
          layout="vertical"
          ref="formRef"
          :model="form"
          :rules="rules"
          @finish="onSubmit"
      >
        <a-form-item name="username" label="你的电子邮件地址是什么？">
          <a-input v-model:value="form.username" size="large" placeholder="输入你的电子邮件地址。"/>
        </a-form-item>
        <a-form-item name="code" label="Spotify 提交码">
          <a-input v-model:value="form.code" size="large" placeholder="输入Spotify提交码">
            <template #suffix>
              <a @click="openSubmitSignup">购买提交码</a>
            </template>
          </a-input>
        </a-form-item>
        <a-button type="primary" html-type="submit" block size="large" :loading="loading" :disabled="loading">提交账号</a-button>
      </a-form>
    </div>
  </a-drawer>
  <submit-buy-signup v-model:visible="showSubmitSignup"  @done="openPayQrcode"/>
  <open-buy-qrcode v-model:visible="showPayQrcode" :payment="payCurrent" @done="finish"/>
</template>

<script setup lang="ts">
import {DrawerProps, FormInstance, message} from "ant-design-vue";
import useFormData from "@/hooks/useFormData";
import {Rule} from "ant-design-vue/es/form";
import {ref, watch} from 'vue';
import {Signup} from "@/api/signup/model";
import OpenBuyQrcode from "@/views/unlock/components/open-buy-qrcode.vue";
import SubmitBuySignup from "@/views/unlock/components/submit-buy-signup.vue";
import {AlipayResult, SignupCodeResult} from "@/api/payment/model";
import {removeLocalStorage, setLocalStorage} from "@/utils/LocalStorage-util";
import {addAccount} from "@/api/account";
import {getSignupCode} from "@/api/signup";

const placement = ref<DrawerProps['placement']>('bottom');

const emit = defineEmits<{
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

const loading = ref(false);

const formRef = ref<FormInstance | null>(null);

const { form, resetFields } = useFormData<Signup>({
  username: undefined,
  code: undefined
});

function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 表单验证规则
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: (_rule: Rule, value: string, callback) => {
        if (value == '' || value === undefined) {
          callback('输入你的电子邮件地址。');
        } else if (!isEmail(value)) {
          callback('请输入正确的电子邮件地址。');
        } else {
          callback();
        }
      }
    }
  ],
  code: [
    {
      required: true,
      message: '请输入提交码',
      type: 'string',
      trigger: 'blur'
    }
  ],
}

const onSubmit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        addAccount(form).then((d) => {
          loading.value = false;
          message.success(d);
          updateVisible(false);
        }).catch((e) => {
          loading.value = false;
          message.error(e.message);
        })
      }).catch(() => {
    loading.value = false;
  })
};

const showSubmitSignup = ref(false);
const openSubmitSignup = () => {
  showSubmitSignup.value = true;
}

/* 打开支付 */
const showPayQrcode = ref(false)
// 当前编辑数据
const payCurrent = ref<AlipayResult | null>(null);
const openPayQrcode = (payment: AlipayResult) => {
  showPayQrcode.value = true;
  payCurrent.value = payment;
}

const finish = (signupCode: SignupCodeResult) => {
  form.code = signupCode.code;
  /* 存储到本地缓存 */
  setLocalStorage("submit_code", signupCode.code, true);
}

const queryCode = () => {
  getSignupCode(1).then((d) => {
    form.code = d.code;
  }).catch((error) => {
    console.log(error.message);
    removeLocalStorage("submit_code")
  })
}

watch(() => props.visible, (visible) => {
  console.log(visible)
  if (visible) {
    queryCode();
  } else {
    resetFields();
    formRef.value?.clearValidate();
  }
})
</script>

<style scoped>

</style>