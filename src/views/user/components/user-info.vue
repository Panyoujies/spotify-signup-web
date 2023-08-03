<template>
  <a-descriptions title="免费会员" bordered>
    <template #extra>
      <a-button type="primary" shape="round" @click="openLogout">退出登录</a-button>
    </template>
    <a-descriptions-item label="昵称">{{ loginUser.nickName }}</a-descriptions-item>
    <a-descriptions-item label="邮箱" :span="3">{{ loginUser.email ?? '未绑定邮箱' }}</a-descriptions-item>
    <a-descriptions-item label="会员详情" :span="3">
      <a-row :gutter="[10, 10]">
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <span>注册数量: 0</span>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <span>解锁数量: 0</span>
        </a-col>
        <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <span>密码重置: 0</span>
        </a-col>
      </a-row>
    </a-descriptions-item>
  </a-descriptions>
  <a-divider>车票列表</a-divider>
  <div>
    <a-skeleton :loading="loading">
      <div v-if="isEmpty" style="display: flex; align-items: center; justify-content: center; height: 200px;">
        <a-empty>
          <template #description>
          <span>
            您还未订阅会员
          </span>
          </template>
        </a-empty>
      </div>
      <a-row :gutter="[15, 15]" v-else>
        <a-col v-for="item in ticketList" :key="item.id" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <a-card size="small">
            <template #cover>
              <img alt="example" src="/assets/spotify-banner.svg"/>
            </template>
            <template #actions>
              <a-typography-link key="edit" @click="message.success('功能即将上线')">
                续费账号
              </a-typography-link>
              <a-typography-link v-if="item.status == 0" key="join" @click="openSubmitAccount(item)">
                提交账号
              </a-typography-link>
              <a-typography-link v-if="item.status == 1" key="join" @click="message.success('功能即将上线')">
                同行用户
              </a-typography-link>
            </template>
            <a-card-meta>
              <template #title>
                <div style="display: flex; align-items: center;">
                  <img src="/assets/turkey.svg" style="height: 17px; border-radius: 3px; margin-right: 5px">
                  <span>{{ item.classifyName }}</span>
                </div>
              </template>
              <template #description>
                <div style="display: flex; align-items: center;">
                  <div>有效期至: {{ item.expireTime }}</div>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-col>
      </a-row>
    </a-skeleton>
    <submit-spotify-account v-model:visible="showSubmitAccount" :ticket="ticket"/>
  </div>
</template>

<script setup lang="ts">
import {useMemberStore} from "@/store/modules/member";
import {message, Modal} from "ant-design-vue";
import {createVNode} from "vue";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";
import {logout} from "@/utils/page-tab-util";
import {listTickets} from "@/api/premium/ticket";
import {Ticket} from "@/api/premium/ticket/model";
import SubmitSpotifyAccount from "@/views/user/components/submit-spotify-account.vue";

const ticketList = ref<Ticket[] | null>(null);
const userStore = useMemberStore();
const isEmpty = ref(false);
const loading = ref(false);

// 登录用户信息
const loginUser = computed(() => userStore.info ?? {});

const openLogout = () => {
  // 退出登录
  Modal.confirm({
    title: '提示',
    cancelText: '取消',
    okText: '确定',
    style: {
      width: '330px'
    },
    content: '确定要退出登录吗?',
    icon: createVNode(ExclamationCircleOutlined),
    maskClosable: true,
    onOk: () => {
      logout();
    }
  });
}

const showSubmitAccount = ref<boolean>(false);
const ticket = ref<Ticket | null>(null);
const openSubmitAccount = (row: Ticket) => {
  showSubmitAccount.value = true;
  ticket.value = row;
}

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    listTickets().then((d) => {
      ticketList.value = d;
      isEmpty.value = false;
      if (d.length == 0) {
        isEmpty.value = true;
      }
      loading.value = false;
    }).catch((error) => {
      isEmpty.value = false;
      loading.value = false;
    })
  }, 500)
})
</script>

<style scoped>

</style>