<template>

</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {AuthLoginParam} from "@/api/member/model";
import {postAuthLogin} from "@/api/member";
import {message} from "ant-design-vue";
import {useMemberStore} from "@/store/modules/member";
import {useAuthStore} from "@/store/modules/authStore";
import {goHomeRoute} from "@/utils/page-tab-util";

const { query } = useRoute();
const memberStore = useMemberStore();
const authStore = useAuthStore();

/* 跳转到首页 */
const goHome = () => {
  goHomeRoute('/');
};

const params = ref<AuthLoginParam>({
  source: '',
  code: '',
  state: '',
  remember: true
})

onMounted(() => {
  params.value.source = query.source as string;
  params.value.code = query.code as string;
  params.value.state = query.state as string;
  postAuthLogin(params.value)
      .then((msg) => {
        message.success(msg);
        memberStore.fetchMemberInfo();
        goHome();
      })
      .catch((e) => {
        message.error(e.message);
      });
})
</script>

<style scoped>

</style>