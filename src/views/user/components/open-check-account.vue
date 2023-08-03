<template>
  <a-modal
      :open="visible"
      :title="data?.productName"
      width="300px"
      :confirm-loading="loading"
      @update:visible="updateVisible"
      ok-text="复制并关闭"
      @ok="copyText(data.stockInfo)"
  >
    <div style="width: 100%; display: flex; flex-direction: column; margin-top: 25px; margin-bottom: 20px">
      <n-scrollbar style="min-height: 140px; background-color: rgb(247, 247, 247); border: 1px solid rgb(237 237 237); border-radius: 8px;">
        <div class="context">
          {{ data.stockInfo }}
        </div>
      </n-scrollbar>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {Order} from "@/api/orders/order/model";
import useClipboard from "vue-clipboard3";
import {message} from "ant-design-vue";

// 提交状态
const loading = ref(false);

const emit = defineEmits<{
  (e: 'done'): void;
  (e: 'update:visible', visible: boolean): void;
}>();

const props = defineProps<{
  // 弹窗是否打开
  visible: boolean;
  data: Order | null;
}>();

/* 更新visible */
const updateVisible = (value: boolean) => {
  emit('update:visible', value);
};

/* 复制邀请了诶 */
const copyText = (link: string) => {
  copy(link);
  updateVisible(false);
};

const { toClipboard } = useClipboard();
const copy = async (msg: string) => {
  try {
    // 复制
    await toClipboard(msg);
    message.success('已成功复制: ' + msg);
    // 复制成功
  } catch (e) {
    // 复制失败
  }
};
</script>

<style scoped>
.context {
  font-size: 15px;
  font-weight: 400;
  color: #718096;
  padding: 15px;
  display: flex;
  -webkit-box-align: center;
  flex-direction: column;
  gap: 5px;
}

</style>