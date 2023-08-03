<template>
  <div style="margin: 15px 0">
    <a-row :gutter="[15, 15]">
      <a-col :xs="24" :sm="24" :md="10" :lg="9" :xl="9">
        <user-premium />
      </a-col>
      <a-col :xs="24" :sm="24" :md="14" :lg="15" :xl="15">
        <a-card
            :bordered="false"
            :tab-list="tabListNoTitle"
            :active-tab-key="noTitleKey"
            @tabChange="key => onTabChange(key, 'noTitleKey')"
        >
          <template v-if="!loginUser.email" #tabBarExtraContent>
            <a @click="openBindEmail">绑定邮箱</a>
          </template>
          <user-info v-if="noTitleKey === 'user'"/>
          <order-list v-if="noTitleKey === 'order'"/>
        </a-card>
      </a-col>
    </a-row>
    <bind-email-modal v-if="!isMobile" v-model:visible="showBindEmail" @done="showBindEmail = false"/>
    <bind-email-drawer v-else v-model:visible="showBindEmail" @done="showBindEmail = false" />
  </div>
</template>

<script setup lang="ts">
import UserPremium from "@/views/user/components/premium.vue";
import UserInfo from "@/views/user/components/user-info.vue";
import OrderList from "@/views/user/components/order-list.vue";
import {useMemberStore} from "@/store/modules/member";
import {useBasicLayout} from "@/hooks/useBasicLayout";

const { isMobile } = useBasicLayout();

// 登录用户信息
const userStore = useMemberStore();
const loginUser = computed(() => userStore.info ?? {});

const tabListNoTitle = [
  {
    key: 'user',
    tab: '个人中心',
  },
  {
    key: 'order',
    tab: '订单列表',
  },
];
const key = ref('tab1');
const noTitleKey = ref('user');

const onTabChange = (value: string, type: string) => {
  console.log(value, type);
  if (type === 'key') {
    key.value = value;
  } else if (type === 'noTitleKey') {
    noTitleKey.value = value;
  }
};

/**
 * 打开绑定邮箱
 */
const showBindEmail = ref(false);
const openBindEmail = () => {
  showBindEmail.value = true;
}
</script>

<style scoped>
:deep(.n-tabs .n-tabs-nav-scroll-content) {
  border-bottom: 1px solid #f3f4f4;
  padding: 2px 0;
}

:deep(.n-tabs .n-tabs-bar) {
  height: 4px;
  bottom: 8px;
  border-radius: 4px;
}

:deep(.n-tabs .n-tabs-nav .n-tabs-nav__suffix) {
  border-bottom: 1px solid #f3f4f4;
  padding-right: 20px;
  font-size: 18px;
}

:deep(.n-tabs .n-tab-pane) {
  padding: 20px;
}
</style>