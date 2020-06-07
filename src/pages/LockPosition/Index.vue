<template>
  <q-page class="row justify-center">
    <div class="col-xs-11 lock-warpper">
      <!-- <span class="title">锁仓</span> -->
      <Breadcrumb />
      <q-card
        flat
        class="q-py-md q-px-none lock-main"
        style="background:rgba(255, 255, 255,.05)"
      >
        <q-card-section class="q-pb-sm" style="font-size:14px"
          >{{$t('lock_position_node')}}</q-card-section
        >
        <q-card-section class="q-py-none row" style="font-size:14px;">
          <q-btn
            v-for="item in nodeList"
            :key="item.id"
            unelevated
            no-caps
            :outline="item.id != currentNodeId"
            :label="`V${item.name} ${$t('lock_position_node1')}`"
            :color="item.id == currentNodeId ? 'primary' : ''"
            :text-color="item.id == currentNodeId ? 'dark' : 'primary'"
            class="q-mr-xs q-mb-xs col-xs-4 node-item"
            style="font-size:12px; width:100px; height:40px;"
            @click="selectNode(item.id)"
          />
        </q-card-section>
        <q-card-section class="section-title q-pt-lg q-pb-sm"
          >{{$t('lock_position_num')}}</q-card-section
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
          >{{$t('lock_position_available')}}：{{ canUseRBI }} RBI</q-card-section
        >
        <q-card-section class="q-pt-lg q-pb-xs">
          <div class="earning-info column justify-center items-center">
            <div class="yield">
              <strong>{{ currentNode.rate && (currentNode.rate * 100).toFixed(2) }}</strong
              >%
            </div>
            <div class="earning-text">{{$t('lock_position_revenue')}}</div>
          </div>
        </q-card-section>
        <q-card-section
          class="q-py-xs pc_text"
          v-if="lang == 'en-us'"
          style="font-size: 12px; color: rgba(255, 255, 255, .6)"
          >
          Expected to start calculating revenue in {{currentNode.interestTimeBegin | formatDate}}
          </q-card-section
        >
        <q-card-section
          class="q-py-xs pc_text"
          v-else
          style="font-size: 12px; color: rgba(255, 255, 255, .6)"
          >
          预计{{currentNode.interestTimeBegin | formatDate}}开始计算收益
          </q-card-section
        >
        <q-card-section class="q-pt-lg">
          <q-btn
            :label="$t('lock_position_confirm')"
            color="primary"
            no-caps
            text-color="dark"
            rounded
            @click="confirm"
            style="width: 100%; height: 46px; font-size:16px"
          />
        </q-card-section>
      </q-card>
    </div>

    <Dialog ref="confirmDialog" :title="$t('lock_position_confirm_mining')" @confirm="onConfirm">
      <div class="lock-num row justify-center items-end">
        <strong>{{ currentNode.num }}</strong
        >RBI
      </div>
    </Dialog>

    <!-- ref="safeDialog" -->
    <SafeValidate
      :show.sync="showSafeDialog"
      :validType="validType"
      @safeConfirm="onSafeConfirm"
    />
  </q-page>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb'
import Dialog from 'components/Dialog'
import { date } from 'quasar'
import { getNodeList, nodeBuy } from 'src/api/apiList'
export default {
  inject: ['nodeInputStyle'],
  data() {
    return {
      showConfirm: false, // 显示确认弹框
      showSafeDialog: false, // 显示安全验证弹框
      currentNodeId: 0, // 当前选择的节点
      nodeList: [], // 节点列
      canUseRBI: 0, // 可用RBI
      validType: 2, // 验证类型，1:google; 2:phone; 3:email
      lang: ''
    }
  },
  components: { Breadcrumb, Dialog },
  computed: {
    // 当前选择的节点
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
      if (Number(this.canUseRBI) < Number(this.currentNode.num)) {
        return this.$q.notify({ message: this.$t('notify_cant_buy') })
      }
      this.$refs.confirmDialog.open()
    },
    // 确定弹框确定事件
    onConfirm() {
      this.showSafeDialog = true
    },
    // 安全验证确定按钮事件
    async onSafeConfirm(code) {
      try {
        await nodeBuy({ id: this.currentNode.id, code })
        this.$router.replace({
          name: 'success',
          params: { text: this.$t('com_lock_success'), date: this.currentNode.interestTimeBegin, path: '/mining' }
        })
      } catch (error) {}
    },
    // 获取节点列表
    async getNodeList() {
      const { data } = await getNodeList()
      this.nodeList = data.list.filter(item => {
        return !item.lockStatus
      })
    },
    async getUserInfo() {
      const { data } = await this.$store.dispatch('UpdateUserInfo')
      this.canUseRBI = data.balandeRBI
      this.validType = data.securityLevel
    }
  },
  created() {
    this.currentNodeId = Number(this.$route.query.id)
    this.getUserInfo()
    this.getNodeList()
    this.lang = this.$i18n.locale
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
@media screen and (min-width: 599px) {
  .lock-warpper{
    max-width: 670px;
  }
  .lock-main{
    padding: 40px 22%;
  }
  .node-item{
    margin-right: 14px;
    margin-bottom: 14px;
  }
  .breadcrumb {
    height: 62px;
    line-height: 62px;
    padding-left: 20px;
}
.pc_text{
  text-align: center;
}
}

</style>
