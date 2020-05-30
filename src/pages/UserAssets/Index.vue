<template>
  <q-page>
    <div class="header column justify-center items-center">
      <div class="header-text">总资产</div>
      <div class="header-number">199999.1234</div>
      <div class="header-btn row items-center ">
        <div
          v-ripple
          class="btn withdraw-btn row justify-center items-center relative-position"
          to="/mining"
          @click="showAddress = !showAddress"
        >
          充币
        </div>
        <div
          v-ripple
          class="btn recharge-btn row justify-center items-center relative-position"
          to="/mining"
        >
          提币
        </div>
      </div>
    </div>
    <div class="q-px-md" v-if="showAddress">
      <span>RBI充币</span>
      <div
        class="column items-center q-mt-sm"
        style="background: rgba(255, 255, 255, 0.05); margin-bottom: 40px"
      >
        <span class="q-pt-lg">我的RBI地址</span>
        <div class="q-pt-md">{{ address }}</div>
        <div class="q-mt-xl q-mb-md">
          <q-btn
            outline
            color="primary"
            label="复制地址"
            class="q-mr-lg"
            style="width:120px; height: 36px"
            @click="copyAddress"
          />
          <q-btn
            color="primary"
            text-color="dark"
            label="二维码"
            style="width:120px; height: 36px"
          />
        </div>
      </div>
    </div>
    <q-list separator style="background: rgba(255,255,255,0.05)">
      <q-item-label
        header
        class="q-pt-none q-pb-md"
        style="background: #1B1F41"
      >
        交易记录
      </q-item-label>
      <!-- class="q-py-md" dense -->
      <q-expansion-item v-for="item in '123'" :key="item" dark dense  group="group">
        <template v-slot:header>
          <q-item class="q-py-md row" style="flex:1">
            <q-item-section>
              <div>V2节点挖矿收益</div>
              <div class="q-mt-md text-grey-8" style="font-size: 11px">
                2020-05-06 14:22:12
              </div>
            </q-item-section>
            <q-item-section style="text-align: right">
              <!-- + #14BE7D  - #FC4A1A -->
              <span
                :style="{ color: 123 > 0 ? '#14BE7D' : '#FC4A1A' }"
                style="font-size: 15px"
              >
                {{ 123 > 0 ? '+' : '-' }}123
              </span>
            </q-item-section>
          </q-item>
        </template>
        <q-card style="background: #1B1F41">
          <q-card-section class="content" style="">
            <div class="q-mb-xs">对方地址:</div>
            <div class="q-mb-lg">
              0x2c4192c55654ac6dcfd9f7bc2ea1869bdfdaa25e
            </div>
            <div class="q-mb-xs">交易ID:</div>
            <div>
              5cdf4409a0ffce35dfa653b23dfdaadef2a6774824633b0f691ea999bdd5cc27
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      showAddress: false,
      address: '7197291729dhahhdehsss@BBbwallet'
    }
  },
  methods: {
    async copyAddress() {
      try {
        await this.$copyText(this.address)
        this.$q.notify({
          icon: 'done',
          textColor: 'green',
          message: '地址复制成功'
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          icon: 'warning',
          textColor: 'red',
          message: '地址复制失败'
        })
      }
    }
  }
}
</script>

<style lang="scss">
// 上下箭头的padding
.q-item__section--side {
  padding: 0;
}
</style>

<style lang="scss" scoped>
.header {
  height: 162px;
  background: url('~assets/images/assets-bg.png');
  background-size: 100% 100%;
  position: relative;
  margin-bottom: 20px;
}
.header-text {
  font-size: 15px;
  color: rgba($color: #fff, $alpha: 0.6);
  margin-bottom: 13px;
}
.header-number {
  font-size: 36px;
  color: #fff;
}
.header-btn {
  width: 153px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  .btn {
    flex: 1;
    font-size: 14px;
    height: 100%;
    &::before {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 5px;
    }
  }
  .withdraw-btn {
    color: #14be7d;
    &::before {
      background: url('~assets/images/withdraw-btn.png');
      background-size: 100% 100%;
    }
  }
  .recharge-btn {
    color: #fc4a1a;
    &::before {
      background: url('~assets/images/recharge-btn.png');
      background-size: 100% 100%;
    }
    &::after {
      content: '';
      position: absolute;
      background: #eaeaea;
      width: 1px;
      height: 14px;
      left: 0;
    }
  }
}

.content {
  background: rgba(255, 255, 255, 0.05);
  word-break: break-all;
  color: rgba($color: #fff, $alpha: 0.6);
}
</style>
