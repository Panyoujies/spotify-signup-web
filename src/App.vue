<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <a-config-provider :theme="theme">
      <n-layout position="absolute" class="bomaos-safe-area-bottom" >
        <n-layout-header bordered>
          <bomaos-header/>
        </n-layout-header>
        <n-layout ref="contentRef" position="absolute" style="top: 67px; bottom: 71px; background-color: #f5f5f5 !important" :native-scrollbar="false" class="bomaos-safe-area-bottom">
          <div class="container">
            <router-view v-slot="{ Component }">
              <div style="flex: 1;">
                <transition name="fade-slide-y" mode="out-in">
                  <component :is="Component"/>
                </transition>
              </div>
            </router-view>
          </div>
        </n-layout>
        <n-layout-footer bordered position="absolute" class="bomaos-safe-area-bottom">
          <bomaos-footer/>
        </n-layout-footer>
      </n-layout>
      <login-modal v-if="!isMobile" v-model:visible="showModal" @done="authStore.closeModal" />
      <login-drawer v-else v-model:visible="showModal" @done="authStore.closeModal" />
      <!-- 客服组件 -->
      <customer-service />
    </a-config-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import CustomerService from "@/components/common/customer-service.vue";
import LoginModal from "@/components/login/login-modal.vue";
import {useRoute} from "vue-router";
import {LayoutInst, NConfigProvider} from 'naive-ui';
import {useAuthStore} from "@/store/modules/authStore";
import {useBasicLayout} from "@/hooks/useBasicLayout";
import {Crisp} from "crisp-sdk-web";

const route = useRoute();
const top = ref<number>(0);
const authStore = useAuthStore();
const showModal = computed(() => authStore.showModal);
const { isMobile } = useBasicLayout();
const contentRef = ref<LayoutInst | null>(null);

/* crisp 客服 */
Crisp.configure('7a9c6f28-4554-460c-bd2b-1650259678d7', {
  autoload: true
});

/**
 * 首页是否显示导航栏
 */
const showNavigationBar = ref(true)

/**
 * 监听路由变化
 */
watch(route, (to, from) => {
  contentRef.value?.scrollTo({ top: 0 })
  showNavigationBar.value = !!to.path.indexOf('/product/');
})

/**
 * js 文件下使用这个做类型提示
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  common: {
    primaryColor: '#31c27c'
  },
  Button: {
    textColor: '#31c27c'
  },
  Select: {
    peers: {
      InternalSelection: {
        textColor: '#31c27c'
      }
    }
  }
}

const theme = {
  token: {
    colorPrimary: '#31c27c',
    colorLink: '#31c27c',
    colorLinkHover: 'rgba(49,194,124,0.69)'
  },
};
</script>

<style scoped>
.header-logo svg {
  width: 60px;
  height: 60px;
}

.header-logo span {
  margin-left: 15px;
  letter-spacing: 1.5px;
  font-size: 30px;
  font-weight: bold;
}

.bomao-logo span, .bomao-logo img {
  vertical-align: middle;
}

.bomao-admin-header-avatar .ant-avatar + span {
  padding-left: 8px;
}
</style>
