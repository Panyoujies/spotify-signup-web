<template>
  <!-- 表格 -->
  <n-data-table
      remote
      bordered
      :single-line="false"
      size="large"
      ref="table"
      :columns="createColumns()"
      :data="createData"
      :loading="loadingRef"
      :pagination="paginationReactive"
      @update:page="handlePageChange"
  />
  <open-check-account v-model:visible="showCheckAccount" :data="current"/>
</template>

<script setup lang="ts">
import {DataTableColumns} from "naive-ui";
import {reactive} from "vue";
import {pageOrders} from "@/api/orders/order";
import {Button, message} from "ant-design-vue";
import {Order, OrderParam} from "@/api/orders/order/model";
import OpenCheckAccount from "@/views/user/components/open-check-account.vue";

/**
 * 支出记录 Columns
 */
const createColumns = (): DataTableColumns<Order> => {
  return [
    {
      title: '商品类型',
      key: 'productName',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '购买时间',
      key: 'createTime',
      ellipsis: {
        tooltip: true
      }
    },
    {
      title: '查看账号',
      key: 'status',
      width: 114,
      align: 'center',
      render (row) {
        return h(
            Button,
            {
              onClick: () => openCheck(row)
            },
            { default: () => '查看账号' }
        )
      }
    }
  ]
}

/**
 * 充值数据显示
 */
const loadingRef = ref(true);
const createData = ref<Order[]>([{}]);
const paginationReactive = reactive({
  page: 1,
  pageCount: 1,
  pageSize: 0
})

/**
 * 提交的附加内容
 */
const params = reactive<OrderParam>({
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
  pageOrders(params).then((res) => {
    loadingRef.value = false;
    paginationReactive.pageCount = Math.ceil(res?.total / params.limit);
    createData.value = res?.records.map((mDate?: Order) => {
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

const showCheckAccount = ref(false);
// 当前编辑数据
const current = ref<Order | null>(null);
const openCheck = (row: Order) => {
  if (row.status === 0) {
    message.error('当前订单未支付，无法查看。');
    return;
  }
  showCheckAccount.value = true;
  current.value = row;
}
</script>

<style scoped>

</style>