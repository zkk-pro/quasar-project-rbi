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
            v-for="item in '123456'"
            :key="item"
            unelevated
            :outline="item != currentNode"
            label="V1 节点"
            :color="item == currentNode ? 'primary' : ''"
            :text-color="item == currentNode ? 'dark' : 'primary'"
            class="q-mr-xs q-mb-xs col-xs-4"
            style="font-size:12px; width:100px; height:40px;"
            @click="selectNode(item)"
          />
        </q-card-section>
        <q-card-section class="section-title q-pt-lg q-pb-sm"
          >锁仓节点</q-card-section
        >
        <q-card-section class="section-title q-pt-none q-pb-sm">
          <q-input
            filled
            dense
            :style="nodeInputStyle"
            label-color="white"
            :input-style="{ color: '#fff' }"
            placeholder="输入需要锁定的RBI数量"
          >
            <template v-slot:append>
              <span style="color:#fff; font-size:14px">RBI</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-section
          class="q-py-xs"
          style="font-size: 12px; color: rgba(255, 255, 255, .6)"
          >可用：1000.12345678 RBI</q-card-section
        >
        <q-card-section class="q-pt-lg q-pb-xs">
          <div class="earning-info column justify-center items-center">
            <div class="yield"><strong>40</strong>%</div>
            <div class="earning-text">瓜分POS挖矿收益</div>
          </div>
        </q-card-section>
        <q-card-section
          class="q-py-xs"
          style="font-size: 12px; color: rgba(255, 255, 255, .6)"
          >预计2020-05-15开始计算收益</q-card-section
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
        <strong>100</strong>RBI
      </div>
    </Dialog>

    <safe-validate ref="safeDialog" validType="google" />
  </q-page>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb'
import Dialog from 'components/Dialog'
import SafeValidate from 'components/SafeValidate'
export default {
  inject: ['nodeInputStyle'],
  data() {
    return {
      showConfirm: false,
      currentNode: 2 // 当前选择的节点
    }
  },
  components: { Breadcrumb, Dialog, SafeValidate },
  methods: {
    // 节点选择
    selectNode(item) {
      this.currentNode = item
    },
    // 确定按钮
    confirm() {
      this.$refs.confirmDialog.open()
    },
    // 确定弹框确定事件
    confirmHandle() {
      this.$refs.safeDialog.open()
    }
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
