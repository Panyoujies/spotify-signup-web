<template>
  <a-modal
      :open="visible"
      width="300px"
      :closable="false"
      :confirm-loading="loading"
      @update:visible="updateVisible"
  >
    <div class="ant-result ant-result-success">
      <div class="ant-result-icon">
        <span role="img" aria-label="check-circle" class="anticon anticon-check-circle">
          <svg focusable="false" class="" data-icon="check-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true" viewBox="64 64 896 896">
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
          </svg>
        </span>
        <div class="title">
          <div class="ant-result-title">注册成功</div>
          <div class="ant-result-span">您已成功注册Spotify账号</div>
        </div>
      </div>
      <a-divider dashed />
      <div class="account" style="">
        <div class="ant-result-span">账号: {{ data.email }}</div>
        <div class="ant-result-span">密码: {{ data.password }}</div>
      </div>
      <div class="ant-result-extra">
        <div style="width: 100%; color: #000000; text-align: center;">
          账户详情，已经发送至您的邮箱
          <br>
          <b style="color: #31c27c">请注意查收。</b>
        </div>
      </div>
    </div>
    <template #footer>
      <div style="font-size: 14px; text-align: center; color: #31c27c; margin-top: 20px">
        本站还提供14天解锁服务，感觉不错的快向身边的小伙伴推荐吧！
      </div>
    </template>
  </a-modal>
</template>

<script setup lang="ts">
import {SignupResult} from "@/api/signup/model";
import useClipboard from "vue-clipboard3";
import {message} from "ant-design-vue/es";

// 提交状态
const loading = ref(false);
const timer = ref();

const emit = defineEmits<{
(e: 'done'): void;
(e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
  data: SignupResult | null;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  timer.value && clearInterval(timer.value);
  emit('update:visible', value);
};

/* 复制邀请了诶 */
const copyInviteLink = (link: string) => {
  copy(link);
};

const { toClipboard } = useClipboard();
const copy = async (msg: string) => {
  try {
    // 复制
    await toClipboard(msg);
    message.success('成功复制优惠券，正在前往悦音坊');
    setTimeout(() => {
      window.open('http://m.zlianyun.cn')
    }, 1500);
    // 复制成功
  } catch (e) {
    // 复制失败
  }
};

onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value);
});

watch(() => props.visible, (visible) => {
  if (visible) {

  }
})
</script>

<style scoped>
.ant-result {
  padding: 0;
}

.ant-result-icon {
  text-align: left;
  margin-bottom: 20px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.title {
  text-align: center;
  margin-top: 15px;
}

.ant-result-title {
  font-size: 18px;
  line-height: 1.2;
  font-weight: bold;
}

.ant-result-span {
  font-size: 15px;
  margin-top: 5px;
}

.ant-result-icon > .anticon {
  font-size: 50px;
  color: #31c27c;
}

.ant-result-extra {
  margin: 0;
}

:deep(.ant-divider-horizontal) {
  margin: 15px 0;
}

.account {
  display: flex;
  justify-content: center;
  flex-flow: column wrap;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 15px;
  align-content: center;
  padding: 15px;
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #f7f7f7;
  border-radius: 4px;
}
</style>