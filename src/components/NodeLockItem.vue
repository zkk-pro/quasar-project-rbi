<template>
  <div class="node" @click="$emit('nodeClick')">
    <div class="node-name relative-position">
      <node-icon :node="nodeData.name" />
      <div class="date q-mt-sm" v-if="!showBtn">2020-05-10 11:11</div>
      <div
        v-if="!showBtn"
        class="status absolute-right"
        :style="{ color: status ? '#00E6FF' : '#999' }"
      >
        持有中
      </div>
    </div>

    <div class="node-info column items-center" style="flex:1">
      <Number :number="nodeData.num" big-size="30px" small-size="13px" />
      <div class="rbi-yield">瓜分POS挖矿收益的{{ nodeData.rate * 100 }}%</div>
      <q-btn
        v-if="showBtn"
        rounded
        label="去锁仓>"
        color="dark"
        text-color="cyan-12"
        to="/lock-position"
        style="width: 160px;height:40px"
      />
      <!-- :disable="!!nodeData.status"
        :outline="!nodeData.status" -->
    </div>
  </div>
</template>

<script>
import NodeIcon from 'components/NodeIcon'
import Number from 'components/Number'

export default {
  props: {
    showBtn: Boolean,
    nodeData: Object
  },
  data() {
    return {
      disabled: false,
      status: 1
    }
  },
  components: { NodeIcon, Number },
  created() {}
}
</script>

<style lang="scss" scoped>
.node {
  height: 190px;
  position: relative;
  padding: 20px 0;
}
body.screen--xs {
  .node {
    background: url('~assets/images/node-item-bg.png');
    background-size: 100% 100%;
  }
}
.node-name {
  padding-left: 15px;
  .date {
    margin-left: 60px;
    font-size: 12px;
    color: #999;
  }
  .status {
    right: 15px;
    font-size: 12px;
  }
}
.node-info {
  margin-top: 22px;
}
.rbi-number {
  font-size: 13px;
  strong {
    font-size: 30px;
    font-weight: bold;
    margin-right: 10px;
  }
}
.rbi-yield {
  color: #8e8e96;
  font-size: 13px;
  margin: 10px 0 22px 0;
}
</style>
