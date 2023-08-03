<template>
  <div style="margin: 15px 0">
    <a-row :gutter="[15, 15]">
      <a-col :xs="24" :sm="24" :md="12" :lg="9" :xl="9">
        <a-card title="解锁14天账户" :bordered="false">
          <template #extra>
            <a @click="openSubmitAccount">非本站注册? 提交</a>
          </template>
          <unlock-submit-account @done="query(params)"/>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="15" :xl="15">
        <a-card title="历史提交记录" :bordered="false">
          <template #extra>
            <router-link to="/user">订阅会员?</router-link>
          </template>
          <!-- 表格 -->
          <n-data-table
              remote
              bordered
              size="large"
              ref="table"
              :columns="columns"
              :data="data"
              :loading="loadingRef"
              :pagination="pagination"
              @update:page="handlePageChange"
          />
          <a-divider />
          <div style="font-size: 16px">
            新注册的Spotify账号不要提交，这里是给14天登不上的用户提供的解封渠道。
          </div>
        </a-card>
      </a-col>
    </a-row>
    <submit-spotify-account-modal v-if="!isMobile" v-model:visible="showSubmitAccount"/>
    <submit-spotify-account-drawer v-else v-model:visible="showSubmitAccount"/>
  </div>
</template>

<script lang="ts">
import {pageAccountUnlocks} from "@/api/account-unlock";
import {AccountUnlock, AccountUnlockParam} from "@/api/account-unlock/model";
import {reactive} from "vue";
import {DataTableColumns, NTag} from "naive-ui";
import UnlockSubmitAccount from "./components/unlock-submit-account.vue";
import SubmitSpotifyAccount from "@/views/unlock/components/submit-spotify-account-modal.vue";
import SubmitSpotifyAccountModal from "@/views/unlock/components/submit-spotify-account-modal.vue";
import {useBasicLayout} from "@/hooks/useBasicLayout";
import SubmitSpotifyAccountDrawer from "@/views/unlock/components/submit-spotify-account-drawer.vue";

/**
 * 支出记录 Columns
 */
const createColumns = (): DataTableColumns<AccountUnlock> => {
  return [
    {
      title: '提交账号',
      key: 'email',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '提交时间',
      key: 'createTime',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '处理状态',
      key: 'status',
      width: 100,
      render (row) {
        return h(
            NTag,
            {
              style: {
                marginRight: '6px'
              },
              type: row.status == 1 ? 'success' : row.status == 2 ? 'error' : 'warning',
              bordered: false
            },
            {
              default: () => row.status == 1 ? '成功解锁' : row.status == 2 ? '密码错误' : '等待解锁'
            }
        )
      }
    }
  ]
}
export default defineComponent({
  components: {SubmitSpotifyAccountDrawer, SubmitSpotifyAccountModal, SubmitSpotifyAccount, UnlockSubmitAccount},
  setup() {
    const { isMobile } = useBasicLayout();

    /**
     * 充值数据显示
     */
    const loadingRef = ref(true);
    const createData = ref<AccountUnlock[]>([{}]);
    const paginationReactive = reactive({
      page: 1,
      pageCount: 1,
      pageSize: 0,
      prefix: () => {
        return '提交完成后等待客服处理'
      }
    })

    /**
     * 提交的附加内容
     */
    const params = reactive<AccountUnlockParam>({
      page: 1,
      limit: 5
    });

    onMounted(() => {
      query(params);
    })

    /**
     * 查询订单数据
     * @param limit
     * @param page
     */
    const query = (params) => {
      pageAccountUnlocks(params).then((res) => {
        loadingRef.value = false;
        paginationReactive.pageCount = Math.ceil(res?.total / params.limit);
        createData.value = res?.records.map((mDate?: AccountUnlock) => {
          return {
            ...mDate
          }
        })
      })
    }

    /**
     * 点击分页查询
     * @param currentPage
     */
    const handlePageChange = (currentPage) => {
      loadingRef.value = true;
      params.page = currentPage;
      paginationReactive.page = currentPage;
      query(params);
    }

    const showSubmitAccount = ref<boolean>(false);
    const openSubmitAccount = () => {
      showSubmitAccount.value = true;
    }

    return {
      isMobile,
      data: createData,
      columns: createColumns(),
      loadingRef: loadingRef,
      handlePageChange,
      pagination: paginationReactive,
      params,
      query,
      showSubmitAccount,
      openSubmitAccount
    }
  }
})

</script>

<style scoped>
:deep(.ant-tag) {
  margin-right: 0px;
}

:deep(.ant-table-pagination.ant-pagination) {
    margin-bottom: 0px;
}
</style>