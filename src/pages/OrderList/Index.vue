<template>
  <div>
    <img
      class="gt-xs"
      src="~assets/pc_images/p-mining-banner.png"
      alt="mining-banner"
      width="100%"
      v-if="$route.path !== '/mining-order/order-detail'"
    />
    <div class="container">
      <Breadcrumb class="col-xs-11 q-pl-lg" />
      <node-lock-item
        style="margin-bottom:15px"
        v-for="item in orderList"
        :key="item.id"
        :nodeData="item"
        @nodeClick="onNodeClick"
      />
    </div>
    <q-pagination
      class="q-mt-md row justify-center"
      v-model="params.paging"
      v-if="orderList.length"
      :max="pageInfo.pageMax || 1"
      direction-links
      @input="pageChange"
      size="12px"
    />
  </div>
</template>

<script>
import NodeLockItem from 'components/NodeLockItem'
import Breadcrumb from 'components/Breadcrumb'
import { orderList } from 'src/api/apiList'
export default {
  data() {
    return {
      params: {
        paging: 1,
        limit: 5
      },
      orderList: [],
      pageInfo: {}
    }
  },
  components: { NodeLockItem, Breadcrumb },
  methods: {
    // 页码改变
    pageChange() {
      this.getOrderList()
    },
    // 点击 节点
    onNodeClick(item) {
      this.$router.push({
        path: '/mining-order/order-detail',
        query: { id: item.id }
      })
    },
    async getOrderList() {
      const { data } = await orderList(this.params)
      this.orderList = data
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style lang="scss" scoped></style>
