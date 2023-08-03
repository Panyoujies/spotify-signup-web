<template>
  <a-form
      layout="vertical"
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="onSubmit"
  >
    <a-form-item name="resetUrl" label="密码修改链接">
      <a-input v-model:value="form.resetUrl" size="large" placeholder="请输入密码修改链接"/>
    </a-form-item>
    <a-form-item name="password" label="新密码">
      <a-input v-model:value="form.password" size="large" placeholder="请输入新密码"/>
    </a-form-item>
    <div style="display: inline-flex; align-items: center; gap: 15px; width: 100%">
      <a-button type="primary" html-type="submit" block size="large" :loading="loading" :disabled="loading">修改密码</a-button>
      <a-button block size="large" @click="prev">上一步</a-button>
    </div>
  </a-form>
  <van-overlay :show="loading" lock-scroll :z-index="2000">
    <div style="height: 100%; display: flex; align-items: center; justify-content: center;">
      <a-spin size="large" tip="正在修改密码中..."></a-spin>
    </div>
  </van-overlay>
</template>

<script setup lang="ts">
import {FormInstance, message} from "ant-design-vue";
import useFormData from "@/hooks/useFormData";
import {Signup} from "@/api/signup/model";
import {Rule} from "ant-design-vue/es/form";
import {passwordReset} from "@/api/signup";

const emit = defineEmits<{
  (e: 'done'): void;
}>();

const formRef = ref<FormInstance | null>(null);
const loading = ref(false);

const { form } = useFormData<Signup>({
  resetUrl: undefined,
  password: undefined
});

// 表单验证规则
const rules: Record<string, Rule[]> = {
  resetUrl: [
    {
      required: true,
      message: '请输入密码修改链接',
      type: 'string',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入新密码',
      type: 'string',
      trigger: 'blur'
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
        passwordReset(form).then((d) => {
          loading.value = false;
          message.success(d);
          emit('done');
        }).catch((e) => {
          loading.value = false;
          message.error(e.message);
        })
      })
};

const prev = () => {
  emit('done');
}
</script>

<style scoped>

</style>