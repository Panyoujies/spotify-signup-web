<template>
  <a-form
      layout="vertical"
      ref="formRef"
      :model="form"
      :rules="rules"
      @finish="onSubmit"
  >
    <a-form-item
        name="country"
        label="选择地区"
    >
      <a-select v-model:value="form.country" size="large" placeholder="请选择地区">
        <a-select-option value="香港">🇨🇳 中国香港</a-select-option>
        <a-select-option value="台湾">🇨🇳 中国台湾</a-select-option>
        <a-select-option value="美国">🇺🇸 美国</a-select-option>
        <a-select-option value="德国">🇩🇪 德国</a-select-option>
        <a-select-option value="菲律宾">🇵🇭 菲律宾</a-select-option>
        <a-select-option value="印度">🇮🇳 印度</a-select-option>
        <a-select-option value="新加坡">🇸🇬 新加坡</a-select-option>
        <a-select-option value="日本">🇯🇵 日本</a-select-option>
        <a-select-option value="土耳其">🇹🇷 土耳其</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item name="email" label="你的电子邮件地址是什么？">
      <a-input v-model:value="form.email" size="large" placeholder="输入你的电子邮件地址。"/>
    </a-form-item>
    <a-form-item name="password" label="Spotify 密码">
      <a-input v-model:value="form.password" size="large" placeholder="输入您要Spotify 密码。" />
    </a-form-item>
    <a-button type="primary" html-type="submit" block size="large" :loading="loading" :disabled="loading">提交解锁</a-button>
  </a-form>
</template>

<script setup lang="ts">
import {FormInstance, message} from "ant-design-vue";
import useFormData from "@/hooks/useFormData";
import {AccountUnlock} from "@/api/account-unlock/model";
import {Rule} from "ant-design-vue/es/form";
import {addAccountUnlock} from "@/api/account-unlock";

const emit = defineEmits<{
  (e: 'done'): void;
}>();

const loading = ref(false);

const formRef = ref<FormInstance | null>(null);

const { form } = useFormData<AccountUnlock>({
  country: undefined,
  email: undefined,
  password: undefined
});

function isEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 表单验证规则
const rules: Record<string, Rule[]> = {
  email: [
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
  password: [
    {
      required: true,
      message: '输入您的Spotify密码。',
      type: 'string',
      trigger: 'blur'
    }
  ],
  country: [
    {
      required: true,
      message: '请选择地区。',
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
        addAccountUnlock(form).then((d) => {
          loading.value = false;
          message.success(d);
          emit('done');
        }).catch((e) => {
          loading.value = false;
          message.error(e.message);
        })
      }).catch(() => {
    loading.value = false;
  })
};
</script>

<style scoped>

</style>