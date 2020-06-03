<template>
  <q-page>
    <img
      src="~assets/images/mining-banner.png"
      alt="mining-banner"
      width="100%"
    />
    <div class="row justify-between items-center" style="height: 100px">
      <div class="column items-center" style="flex: 1">
        <div class="row items-cneter" style="margin-bottom: 15px">
          <q-icon name="img:statics/icons/output-icon.png"></q-icon>
          <span class="output-text">今日产出量</span>
        </div>
        <Number :number="todayTotal" />
      </div>
      <div class="column items-center" style="flex: 1">
        <div class="row items-cneter" style="margin-bottom: 15px">
          <q-icon name="img:statics/icons/output-icon.png"></q-icon>
          <span class="output-text">总产出量</span>
        </div>
        <Number :number="total" />
      </div>
    </div>
    <node-lock-item

      style="margin-top:15px"
      v-for="item in nodeList"
      :key="item.id"
      :nodeData="item"
      show-btn
    />
  </q-page>
</template>

<script>
import Number from 'components/Number'
import NodeLockItem from 'components/NodeLockItem'
import { getNodeList } from 'src/api/apiList'

export default {
  data() {
    return {
      nodeList: [],
      todayTotal: 0,
      total: 0
    }
  },
  components: { Number, NodeLockItem },
  methods: {
    async getNodeList() {
      const { data } = await getNodeList()
      this.nodeList = data.list
      this.todayTotal = data.todayOutput
      this.total = data.totalOutput
    }
  },
  created() {
    this.getNodeList()
  }
}
</script>

<style lang="scss" scoped>
.output-text {
  color: #50baf6;
  font-size: 13px;
  margin-left: 4px;
}
</style>
