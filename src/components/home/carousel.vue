<script setup lang="ts">
import {listCarousels} from "@/api/contents/carousel";
import {Carousel} from "@/api/contents/carousel/model";

const loading = ref(false);
const carouselList = ref<Carousel[]>([]);

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    listCarousels().then((res) => {
      carouselList.value = res;
      loading.value = false;
    })
  }, 100)
})
</script>

<template>
  <n-skeleton v-if="loading" height="160px" width="100%" :sharp="false" style="border-radius: 8px"/>
  <n-carousel v-else draggable autoplay :loop="true" :interval="4000" style="border-radius: 8px; height: auto;">
    <div v-for="item in carouselList" :key="item.id" style="width: 100%; height: 160px; border-radius: 8px">
      <img v-if="!item.externalLink" :src="item.cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px">
      <router-link v-if="item.externalLink && item.isExternalLink === 0" :to="item.externalLink as string">
        <img :src="item.cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px">
      </router-link>
      <a v-if="item.externalLink && item.isExternalLink === 1" :href="item.externalLink" target="_blank">
        <img :src="item.cover" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px">
      </a>
    </div>
    <template #dots="{ total, currentIndex, to }">
      <ul class="custom-dots">
        <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
        />
      </ul>
    </template>
  </n-carousel>
</template>

<style scoped lang="less">
.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  justify-content: center;

  li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(155, 142, 142, 0.4);
    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  li.is-active {
    width: 20px;
    background: #5e5e5e;
  }
}
</style>