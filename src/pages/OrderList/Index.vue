<template>
  <node-lock-item @nodeClick="onNodeClick" />
</template>

<script>
import NodeLockItem from 'components/NodeLockItem'
export default {
  components: { NodeLockItem },
  methods: {
    onNodeClick() {
      this.$router.push({ path: '/mining-order/order-detail' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
