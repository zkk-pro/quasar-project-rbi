<template>
  <q-page class="row justify-center">
    <div class="col-xs-11">
      <!-- <span class="title">锁仓</span> -->
      <Breadcrumb />
      <q-card
        flat
        class="q-py-md q-px-none"
        style="background:rgba(255, 255, 255,.05)"
      >
        <q-card-section class="q-pb-sm" style="font-size:14px"
          >锁仓节点</q-card-section
        >
        <q-card-section class="q-py-none row" style="font-size:14px;">
          <q-btn
            v-for="item in nodeList"
            :key="item.id"
            unelevated
            :outline="item.id != currentNodeId"
            :label="`V${item.name} 节点`"
            :color="item.id == currentNodeId ? 'primary' : ''"
            :text-color="item.id == currentNodeId ? 'dark' : 'primary'"
            class="q-mr-xs q-mb-xs col-xs-4"
            style="font-size:12px; width:100px; height:40px;"
            @click="selectNode(item.id)"
          />
        </q-card-section>
        <q-card-section class="section-title q-pt-lg q-pb-sm"
          >锁仓数量</q-card-section
        >
        <q-card-section class="section-title q-pt-none q-pb-sm">
          <q-field
            stack-label
            dense
            filled
            style="background: rgba(255,255,255,0.2); border-radius: 4px"
          >
            <template v-slot:control>
              <div class="text-white">{{ currentNode.num }}</div>
            </template>
            <template v-slot:after>
              <div class="text-white q-px-sm" style="font-size: 14px">RBI</div>
            </template>
          </q-field>
        </q-card-section>
        <q-card-section
          class="q-py-xs"
          style="font-size: 12px; color: rgba(255, 255, 255, .6)"
          >可用：{{ canUseRBI }} RBI</q-card-section
        >
        <q-card-section class="q-pt-lg q-pb-xs">
          <div class="earning-info column justify-center items-center">
            <div class="yield">
              <strong>{{ currentNode.rate * 100 }}</strong
              >%
            </div>
            <div class="earning-text">瓜分POS挖矿收益</div>
          </div>
        </q-card-section>
        <q-card-section
          class="q-py-xs"
          style="font-size: 12px; color: rgba(255, 255, 255, .6)"
          >预计{{
            currentNode.interestTimeBegin | formatDate
          }}开始计算收益</q-card-section
        >
        <q-card-section class="q-pt-lg">
          <q-btn
            label="确定"
            color="primary"
            text-color="dark"
            rounded
            @click="confirm"
            style="width: 100%; height: 46px; font-size:16px"
          />
        </q-card-section>
      </q-card>
    </div>

    <Dialog ref="confirmDialog" title="确定挖矿" @confirm="confirmHandle">
      <div class="lock-num row justify-center items-end">
        <strong>{{ currentNode.num }}</strong
        >RBI
      </div>
    </Dialog>

    <SafeValidate ref="safeDialog" validType="google" />
  </q-page>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb'
import Dialog from 'components/Dialog'
import { date } from 'quasar'
import { getNodeList, getUserInfo } from 'src/api/apiList'
export default {
  inject: ['nodeInputStyle'],
  data() {
    return {
      showConfirm: false,
      currentNodeId: 2, // 当前选择的节点
      nodeList: [], // 节点列
      canUseRBI: 0 // 可用RBI
    }
  },
  components: { Breadcrumb, Dialog },
  computed: {
    currentNode() {
      return this.nodeList.find(item => item.id === this.currentNodeId) || {}
    }
  },
  filters: {
    formatDate(d) {
      return date.formatDate(d, 'YYYY-MM-DD')
    }
  },
  methods: {
    // 节点选择
    selectNode(item) {
      this.currentNodeId = item
    },
    // 确定按钮
    confirm() {
      this.$refs.confirmDialog.open()
    },
    // 确定弹框确定事件
    confirmHandle() {
      this.$refs.safeDialog.open()
    },
    // 获取节点列表
    async getNodeList() {
      const { data } = await getNodeList()
      this.nodeList = data.list
      this.currentNodeId = data.list[0].id
    },
    async getUserInfo() {
      const { data } = await getUserInfo()
      this.canUseRBI = data.balandeRBI
    }
  },
  created() {
    this.getUserInfo()
    this.getNodeList()
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  background: #181837;
}
.title {
  line-height: 33px;
  font-size: 14px;
  color: rgba($color: #fff, $alpha: 0.6);
}
.section-title {
  font-size: 14px;
}
.earning-info {
  background: rgba(255, 255, 255, 0.2);
  height: 100px;
  border-radius: 4px;
  .yield {
    font-size: 13px;
    strong {
      font-size: 40px;
      font-weight: bold;
      margin-right: 8px;
    }
  }
  .earning-text {
    font-size: 13px;
    color: #8e8e96;
    margin-top: 13px;
  }
}
.lock-num {
  color: #333;
  font-size: 13px;
  strong {
    font-size: 30px;
    font-weight: bold;
    margin-right: 10px;
  }
}
</style>
