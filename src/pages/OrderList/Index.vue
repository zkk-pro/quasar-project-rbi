<template>
  <node-lock-item @nodeClick="onNodeClick" />
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
    onNodeClick() {
      this.$router.push({ path: '/mining-order/order-detail' })
    },
    async getOrderList() {
      const { data } = await orderList({ paging: 1, limit: 5 })
      this.orderList = data
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style lang="scss" scoped></style>
