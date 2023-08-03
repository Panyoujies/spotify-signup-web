<template>
  <a-card :bordered="false">
    <template #title>
      <div style="width: 100%; display: flex; flex-direction: column; align-items: center; padding: 15px 0">
        <div style="font-size: 20px; font-weight: bold;">Spotify Premium</div>
        <span style="font-size: 14px; margin-top: 5px; color: #718096">订阅Spotify Premium、享受极致音乐体验</span>
      </div>
    </template>
    <n-tabs type="segment" :default-value="1">
      <n-tab-pane v-for="(item, index) in classifyList" :name="index" :key="item.id">
        <template #tab>
          👑 {{ item.name }}
        </template>
        <div class="chakra-stack css-7k73f3">
          <p class="chakra-text css-zyb6lv">￥{{ item.money }}</p>
          <p class="chakra-text css-1m7lrag">{{ item.unit }}</p>
        </div>
        <a-divider />
        <div class="chakra-stack css-11qelp5">
          <div class="chakra-stack css-frjlfs">
            <p class="chakra-text css-31wrpd">更好的音质</p>
            <p class="chakra-text css-31wrpd">无任何广告干扰</p>
            <p class="chakra-text css-31wrpd">跨地区收听，无14天限制</p>
            <p class="chakra-text css-31wrpd">可以下载歌曲，离线听歌</p>
            <p class="chakra-text css-31wrpd">解锁全部歌单，任意切歌，顺序播放</p>
          </div>
          <a-divider />
          <a-button type="primary" size="large" shape="round" block @click="openJoinMemberDialog(item)">立即订阅</a-button>
        </div>
      </n-tab-pane>
    </n-tabs>
  </a-card>
  <!-- 开通会员 -->
  <open-join-member v-model:visible="showJoinMember" :classify="classify"/>
</template>

<script setup lang="ts">
import OpenJoinMember from "./open-join-member.vue";
import {listClassifys} from "@/api/premium/classify";
import {Classify} from "@/api/premium/classify/model";

const classifyList = ref<Classify[] | null>(null);

const showJoinMember = ref(false);
const classify = ref<Classify | null>(null);
const openJoinMemberDialog = (value: Classify) => {
  showJoinMember.value = true;
  classify.value = value;
}

onMounted(() => {
  listClassifys().then((d) => {
    classifyList.value = d;
  })
})
</script>

<style scoped>
.css-11qelp5 {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
  margin-top: 20px;
}

.css-agkpru {
  width: 45px;
  height: 45px;
}

.css-frjlfs {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  gap: 5px;
}

.css-x4xr8c {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.css-31wrpd {
  font-weight: 400;
  font-size: 16px;
  text-align: center;
}

:deep(.n-tabs .n-tab-pane) {
  padding: 0px !important;
}

.css-7k73f3 {
  display: flex;
  -webkit-box-align: baseline;
  align-items: flex-end;
  -webkit-box-pack: start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 25px;
}

.css-zyb6lv {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1;
}

.css-1m7lrag {
  font-size: 0.875rem;
  color: #718096;
}

.css-7k73f3 > :not(style) ~ :not(style) {
  margin-top: 0px;
  margin-inline: 0.5rem 0px;
  margin-bottom: 0px;
}

:deep(.ant-divider-horizontal) {
  margin: 20px 0;
}
</style>