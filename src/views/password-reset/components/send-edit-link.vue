<template>
  <a-form
      layout="vertical"
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="onSubmit"
  >
    <a-form-item name="username" label="邮箱号码">
      <a-input v-model:value="form.username" size="large" placeholder="请输入要修改密码的Spotify邮箱"/>
    </a-form-item>
    <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%">
      <a-button type="primary" html-type="submit" block size="large" :loading="loading" :disabled="loading">获取密码修改链接</a-button>
      <a-button block size="large" @click="next">下一步</a-button>
    </div>
  </a-form>
  <van-overlay :show="loading" lock-scroll :z-index="2000">
    <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
      <a-spin size="large" tip="正在获取密码重置链接中..."></a-spin>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import useFormData from "@/hooks/useFormData";
import {Signup} from "@/api/signup/model";
import {Rule} from "ant-design-vue/es/form";
import {sendResetUrl} from "@/api/signup";
import {FormInstance, message} from "ant-design-vue";

function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const emit = defineEmits<{
  (e: 'done'): void;
}>();

const formRef = ref<FormInstance | null>(null);
const loading = ref(false);

const { form } = useFormData<Signup>({
  username: undefined,
});

// 表单验证规则
const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: (_rule: Rule, value: string, callback) => {
        if (value == '' || value === undefined) {
          callback('请输入要修改密码的Spotify邮箱');
        } else if (!isEmail(value)) {
          callback('请输入正确的电子邮件地址。');
        } else {
          callback();
        }
      }
    }
  ]
}

const onSubmit = () => {
  if (!formRef.value) {
    return;
  }
  formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        sendResetUrl(form).then((d) => {
          loading.value = false;
          message.success(d);
          emit('done');
        }).catch((e) => {
          loading.value = false;
          message.error(e.message);
        })
      })
};

const next = () => {
  emit('done');
}
</script>

<style scoped>

</style>