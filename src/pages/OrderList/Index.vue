<template>
  <div>
    <node-lock-item
      v-for="item in orderList"
      :key="item.id"
      :nodeData="item"
      @nodeClick="onNodeClick"
    />
  </div>
</template>

<script>
import NodeLockItem from 'components/NodeLockItem'
import { orderList } from 'src/api/apiList'
export default {
  data() {
    return {
      orderList: []
    }
  },
  components: { NodeLockItem },
  methods: {
    onNodeClick(item) {
      this.$router.push({
        path: '/mining-order/order-detail',
        query: { id: item.id }
      })
    },
    async getOrderList() {
      const { data } = await orderList({ paging: 0, limit: 5 })
      this.orderList = data
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style lang="scss" scoped></style>
