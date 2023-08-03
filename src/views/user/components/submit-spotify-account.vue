<template>
  <a-modal
      :open="visible"
      title="提交Spotify账户"
      width="320px"
      :confirm-loading="loading"
      @update:visible="updateVisible"
      :footer="null"
  >
    <div class="content">
      <div style="text-align: center">
        密码仅用于此次授权，我们不会保存和使用您的密码，非自有邮箱，请务必先修改邮箱地址，不支持谷歌授权登陆。
      </div>
      <a-divider>填写Spotify账号</a-divider>
      <a-form
          layout="vertical"
          ref="formRef"
          :model="form"
          :rules="rules"
          @finish="onSubmit"
      >
        <a-form-item name="email" label="你的电子邮件地址是什么？">
          <a-input v-model:value="form.email" size="large" placeholder="输入你的电子邮件地址。"/>
        </a-form-item>
        <a-form-item name="password" label="Spotify 密码">
          <a-input v-model:value="form.password" size="large" placeholder="输入您要Spotify 密码。" />
        </a-form-item>
        <a-button type="primary" html-type="submit" block size="large" :loading="loading" :disabled="loading">确定加入</a-button>
      </a-form>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {FormInstance, message} from 'ant-design-vue';
import useFormData from "@/hooks/useFormData";
import {Rule} from "ant-design-vue/es/form";
import {addAuthorizeAccount} from "@/api/spotify/authorize-account";
import {SpotifyAccountParam} from "@/api/spotify/authorize-account/model";
import {Ticket} from "@/api/premium/ticket/model";

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
  ticket?: Ticket
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

const loading = ref(false);

const formRef = ref<FormInstance | null>(null);

const { form } = useFormData<SpotifyAccountParam>({
  email: undefined,
  password: undefined,
  ticketId: undefined
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
  ]
}

const onSubmit = () => {
  form.ticketId = props.ticket.id;
  if (!formRef.value) {
    return;
  }
  formRef.value
      .validate()
      .then(() => {
        loading.value = true;
        addAuthorizeAccount(form).then((d) => {
          loading.value = false;
          message.success(d);
          updateVisible(false);
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

<style scoped lang="less">
.content {
  margin-top: 20px;
}

.add {
  width: 100%;
}
</style>