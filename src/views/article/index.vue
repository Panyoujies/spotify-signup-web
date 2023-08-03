<script setup lang="ts">
import {Article, ArticleParam} from "@/api/contents/article/model";
import {pageArticles} from "@/api/contents/article";
import {useBasicLayout} from "@/hooks/useBasicLayout";
import {useRoute, useRouter} from "vue-router";
const { isMobile } = useBasicLayout();
const { push } = useRouter();

const articleList = ref<Article[]>([]);
const loading = ref(false);
const disabled = ref(false);
const page = ref<number>(0)
const state = ref(true);

const handleInfiniteOnLoad = () => {
  page.value++;
  supportPage(params.limit, page.value);
};

/**
 * 提交的附加内容
 */
const params = reactive<ArticleParam>({
  page: 1,
  limit: 10
});

const route = useRoute();
const supportPage = (limit?: number, page?: number) => {
  loading.value = true;
  setTimeout(() => {
    pageArticles({ limit, page }).then((res) => {
      if (res.total === 0) {
        state.value = true;
        return;
      }
      state.value = false;
      loading.value = false;
      articleList.value.push(...res.records);
      if (articleList.value.length >= res.total) {
        disabled.value = true;
      }
      if (articleList.value.length > 0) {
        if (route.path === '/article') {
          push('/article/' + articleList.value[0].id);
        }
      }
    })
  }, 100)
}


onMounted(() => {
  page.value = 0;
  handleInfiniteOnLoad();
})
</script>

<template>
  <div style="margin: 15px 0">
    <a-row :gutter="[15, 15]">
      <a-col v-if="!isMobile" :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
        <a-card title="文章列表" :bordered="false" class="sticky-article" :bodyStyle="{ padding: 0 }" >
          <n-scrollbar style="height: calc(100vh - 356px);">
            <router-link
                class="van-cell van-cell--clickable"
                role="button"
                tabindex="0"
                v-for="item in articleList"
                :key="item.id"
                :to="'/article/' + item.id"
                active-class="bomaos-this"
            >
              <div class="van-cell__title">
                <n-ellipsis :line-clamp="2">
                  <span>{{ item.title as string }}</span>
                </n-ellipsis>
                <div class="van-cell__label">
                  <div v-time="item.createTime"></div>
                </div>
              </div>
            </router-link>
            <div style="margin-top: 20px; margin-bottom: 20px; display: flex; justify-content: center;">
              <a-button type="primary" shape="round" size="middle" :loading="loading" :disabled="disabled" @click="handleInfiniteOnLoad">
                {{ disabled ? '加载完成' : '加载更多' }}
              </a-button>
            </div>
          </n-scrollbar>
          <template #actions>
            <div class="bomaos-footer">
              <a-alert message="提供一站式Spotify帮助与服务、支持注册、修改密码、解锁14天、下载、会员订阅等专业的解决方案" type="info"/>
            </div>
          </template>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
        <router-view v-slot="{ Component }">
          <div style="flex: 1;">
            <transition name="fade-slide-y" mode="out-in">
              <component :is="Component"/>
            </transition>
          </div>
        </router-view>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="less">

.van-cell {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 21px;
  overflow: hidden;
  color: #000000;
  font-size: 14px;
  line-height: 24px;
  border-left: 3px solid #ffffff;
}

.van-cell--clickable {
  cursor: pointer;
}

.van-cell__title, .van-cell__value {
  flex: 1;
}

.van-cell__label {
  margin-top: 0px;
  color: #707070;
  font-size: 12px;
  line-height: 18px;
}

.van-cell__value {
  position: relative;
  overflow: hidden;
  color: #707070;
  text-align: right;
  vertical-align: middle;
  word-wrap: break-word;
}

.van-icon {
  position: relative;
  display: inline-block;
  font: 14px/1 vant-icon;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.van-cell__left-icon, .van-cell__right-icon {
  height: 24px;
  font-size: 16px;
  line-height: 24px;
}

.van-cell__right-icon {
  margin-left: 4px;
  color: #969799;
}

.van-cell:after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 1px solid #f0f0f0;
  transform: scaleY(.5);
}

.bomaos-this {
  background: #f9f9f9;
  border-left: 3px solid #32c27c;
}

.bomaos-footer {
  width: 100%;
  padding: 12px 24px;
}
</style>