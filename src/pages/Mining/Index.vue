<template>
  <!-- <q-page class="column items-center"> -->
  <q-page class="">
    <img
      class="gt-xs"
      :src="getBannerImg()"
      alt="mining-banner"
      width="100%"
    />
    <img
      class="lt-sm"
      src="~assets/images/mining-banner.png"
      alt="mining-banner"
      width="100%"
    />
    <div style="max-width: 1200px; margin: 0 auto">
      <div
        class="row justify-between items-center full-width"
        style="height: 100px"
      >
        <div class="row justify-center items-center " style="flex: 1">
          <div class="row items-cneter justify-center col-sm-6 col-xs-12">
            <q-icon name="img:statics/icons/output-icon.png"></q-icon>
            <span class="output-text">{{$t('mining_output')}}</span>
          </div>
          <Number class="col-sm-6 text-center" :number="todayTotal" />
        </div>
        <div class="row justify-center items-center " style="flex: 1">
          <div class="row items-cneter justify-center col-sm-6 col-xs-12">
            <q-icon name="img:statics/icons/output-icon.png"></q-icon>
            <span class="output-text">{{$t('mining_total_output')}}</span>
          </div>
          <Number class="col-sm-6 text-center" :number="total" />
        </div>
      </div>
      <node-lock-item
        style="margin-top:15px"
        v-for="item in nodeList"
        :key="item.id"
        :nodeData="item"
        show-btn
      />
    </div>
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
    getBannerImg() {
      var en = this.$i18n.locale === 'en-us' ? 'en' : 'zh'
      console.log(en)
      return require(`src/assets/pc_images/p-mining-banner_${en}.png`)
    },
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
.screen--xs {
  .number {
  margin-top: 14px;
}
}
</style>
