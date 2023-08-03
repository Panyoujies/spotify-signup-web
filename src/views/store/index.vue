<template>
  <div style="margin: 15px 0">
    <div style="margin-bottom: 15px">
      <a-row :gutter="[15, 15]">
        <a-col :xs="24" :sm="24" :md="18" :lg="16" :xl="16">
          <n-carousel show-arrow draggable style="border-radius: 8px">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg">
            <img class="carousel-img" src="https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg">
          </n-carousel>
        </a-col>
        <a-col v-if="!isMobile" :xs="24" :sm="24" :md="6" :lg="8" :xl="8">
          <a-card title="今日推荐" :bordered="false" style="height: 100%">
            <template #extra>
              <router-link to="/user">订阅会员?</router-link>
            </template>
            <div style="margin-top: 15px">说到在 Spotify 上触及听众，你不一定要独自拼搏。我们不只有许多工具可以协助你，更具备一系列与时俱进的资源，可以满足你的需求。这篇快速入门列出各种简单易用的功能。</div>
          </a-card>
        </a-col>
      </a-row>
    </div>
    <a-skeleton :loading="loading">
      <div v-if="isEmpty" style="display: flex; align-items: center; justify-content: center; height: 200px;">
        <a-empty>
          <template #description>
          <span>
            暂无商品
          </span>
          </template>
        </a-empty>
      </div>
      <a-row :gutter="[15, 15]" v-else>
        <a-col v-for="item in categoryList" :span="24" :key="item.id">
          <div style="font-size: 20px; font-weight: bold; margin-left: 5px; margin-bottom: 10px; color: #676767;">{{ item.name }}</div>
          <a-row :gutter="[15, 15]">
            <a-col v-for="item in item.products" :xs="12" :sm="12" :md="6" :lg="6" :xl="6" :key="item.id">
              <router-link class="course-item" :to="{name: 'product',params: {id: item.id}}">
                <div class="img-box">
                  <van-image
                      class="bomaos-image"
                      width="100%"
                      :height="isMobile ? '110px' : '130px'"
                      fit="cover"
                      :src="item.cover"
                  />
                </div>
                <div class="course-info">
                  <div>
                    <p class="course-name">{{ item.name }}</p>
                  </div>
                  <div style="display:flex; justify-content: space-between; align-items:center;">
                    <div>
                      <span class="course-price">{{ item.money }}元</span>
                      <span v-if="!isMobile" class="origin-price" style="text-decoration:line-through;">99元</span>
                    </div>
                    <div>
                      <span class="origin-price">{{ item.saleCount }}人购买</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import {EditOutlined, EllipsisOutlined, SettingOutlined} from '@ant-design/icons-vue';
import {Category} from "@/api/commodity/category/model";
import {listCategorys} from "@/api/commodity/category";
import {useBasicLayout} from "@/hooks/useBasicLayout";

export default defineComponent({
  name: 'Store',
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined
  },
  setup() {
    const effectRef = ref<'slide' | 'fade' | 'card'>('slide');
    const isCardRef = computed(() => effectRef.value === 'card');
    const categoryList = ref<Category[]>();
    const isEmpty = ref(false);
    const loading = ref(false);

    const { isMobile } = useBasicLayout()

    onMounted(() => {
      loading.value = true;
      listCategorys().then((d) => {
        categoryList.value = d;
        isEmpty.value = false;
        if (d.length == 0) {
          isEmpty.value = true;
        }
        loading.value = false;
      }).catch((error) => {
        isEmpty.value = false;
        loading.value = false;
      })
    })

    return {
      isCard: isCardRef,
      myEffect: effectRef,
      effects: ['slide', 'fade', 'card'],
      isMobile,
      categoryList,
      isEmpty,
      loading
    }
  }
})
</script>

<style scoped>
:deep(.n-carousel) {
  height: 240px;
}

.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 8px;
}

@media (max-width: 640px) {
  :deep(.n-carousel) {
    height: 160px;
  }

  .carousel-img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
  }
}

:deep(.creative-enter-from),
:deep(.creative-leave-to) {
  opacity: 0;
  transform: scale(0.8);
}

:deep(.creative-enter-active),
:deep(.creative-leave-active) {
  transition: all 0.3s ease;
}

:deep(.ant-card-meta-title) {
  margin-bottom: 0px !important;
  font-weight: 400;
}

.actions {
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 640px) {
  .course-item {
    height: 12.375rem !important;
  }
  .course-info {
    padding: 15px !important;
  }
}

.course-item {
  border-radius: 0.625rem;
  background-color: white;
  box-shadow: 0 0.25rem 1.875rem #eef2f5cc;
  display: block;
  height: 13.6rem;
  .img-box {
    position: relative;
  }

  .course-info {
    padding: 0.75rem 1.25rem;

    .course-name {
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: #545c63;
      display: -webkit-box;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.25rem;
      margin-bottom: 0.625rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .course-price {
      color: var(--el-color-primary);
      font-size: 1rem;
      margin-right: 0.625rem;
    }

    .origin-price {
      -webkit-box-flex: 1;
      color: #6d7278;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      font-size: .8125rem;
    }
  }
}

.bomaos-image {
  display: inline-block;
  overflow: hidden;
  position: relative;
  border-top-left-radius: 0.625rem;
  border-top-right-radius: 0.625rem;
}

</style>