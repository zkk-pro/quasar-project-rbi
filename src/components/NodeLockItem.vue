<template>
  <div
    class="node row justify-center full-width"
    @click="$emit('nodeClick', nodeData)"
  >
    <div class="node-box row col-12">
      <div class="node-name col-xs-12 col-sm-4 relative-position">
        <node-icon :node="nodeData.name" />
        <div class="date q-mt-sm" v-if="!showBtn">
          {{ nodeData.createTime | formatDate }}
        </div>
        <div
          v-if="!showBtn"
          class="status absolute-right lt-sm"
          :style="{ color: nodeData.status === 1 ? '#999' : '#00E6FF' }"
        >
          {{ nodeData.status | transStatus }}
        </div>
      </div>

      <div class="node-info col-xs-12  col-sm-5 row items-center">
        <Number
          class="col-xs-12 col-sm-3"
          :number="nodeData.num"
          big-size="30px"
          small-size="13px"
        />
        <div class="rbi-yield col-xs-12 col-sm-8">
          {{
            lang == 'en-us'
              ? `Share ${nodeData.rate * 100}% of POS mining revenue`
              : `瓜分POS挖矿收益的${nodeData.rate * 100}%`
          }}
        </div>
      </div>

      <div class="btn-box col-xs-12 col-sm-2 text-right">
        <q-btn
          v-if="showBtn"
          rounded
          :label="$t('mining_lock') + '>'"
          color="dark"
          no-caps
          text-color="cyan-12"
          to="/lock-position"
          style="width: 160px;height:40px"
          :disable="!!nodeData.lockStatus"
          :outline="!nodeData.lockStatus"
        />
        <div
          v-if="!showBtn"
          class="gt-xs"
          :style="{ color: nodeData.status === 1 ? '#999' : '#00E6FF' }"
        >
          {{ nodeData.status | transStatus }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NodeIcon from 'components/NodeIcon'
import Number from 'components/Number'
import { date } from 'quasar'

export default {
  props: {
    showBtn: Boolean,
    nodeData: Object
  },
  data() {
    return {
      disabled: false,
      status: 1,
      lang: ''
    }
  },
  components: { NodeIcon, Number },
  filters: {
    formatDate(d) {
      return date.formatDate(d, 'YYYY-MM-DD HH:mm')
    },
    transStatus(status) {
      if (status === 0) {
        var text = this.lang === 'en-us' ? 'over' : '已结束'
        return text
      } else if (status === 1) {
        var text1 = this.lang === 'en-us' ? 'Holding' : '持有中'
        return text1
      } else if (status === 2) {
        var text2 = this.lang === 'en-us' ? 'Unlocked' : '已解锁'
        return text2
      }
    }
  },
  mounted() {
    this.lang = this.$i18n.locale
  }
}
</script>

<style lang="scss" scoped>
.node {
  position: relative;
  border-radius: 10px;
  background: rgba($color: #000000, $alpha: 0.2);
}
.node-box {
  padding: 20px 80px;
  min-height: 100px;
  background: url('~assets/pc_images/p-node-item-bg.png') no-repeat;
  background-size: 214px 100px;
  background-position: 100% 100%;
  display: flex;
  align-items: center;
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
.node-num {
  display: flex;
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
}

.screen--xs {
  .node {
    background: none;
  }
  .node-box {
    background: url('~assets/images/node-item-bg.png');
    background-size: 100% 100%;
    padding: 20px 0px;
  }
  .node-info {
    margin-top: 22px;
    text-align: center;
  }
  .btn-box {
    text-align: center;
  }
  .rbi-yield {
    margin: 10px 0 22px 0;
  }
}
</style>
