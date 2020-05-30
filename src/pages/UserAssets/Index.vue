<template>
  <q-page class="q-pb-xl">
    <div class="header column justify-center items-center">
      <div class="header-text">总资产</div>
      <div class="header-number">199999.1234</div>
      <div class="header-btn row items-center ">
        <div
          v-ripple
          class="btn withdraw-btn row justify-center items-center relative-position cursor-pointer"
          to="/mining"
          @click=";[(showWithDraw = false), (showAddress = !showAddress)]"
        >
          充币
        </div>
        <div
          v-ripple
          class="btn recharge-btn row justify-center items-center relative-position cursor-pointer"
          @click=";[(showAddress = false), (showWithDraw = !showWithDraw)]"
        >
          提币
        </div>
      </div>
    </div>
    <!-- 充币 -->
    <RechargeAddress :address="address" qrcode="" v-if="showAddress" />
    <!-- 提币 -->
    <WithdrawForm
      v-if="showWithDraw"
      @cancel=";[(showWithDraw = false)]"
      @confirm="withdrawConfirm"
    />
    <!-- 交易记录 -->
    <q-list style="background: rgba(255,255,255,0.05)">
      <q-item-label
        header
        class="q-pt-none q-pb-md"
        style="background: #1B1F41"
      >
        交易记录
      </q-item-label>
      <div v-for="item in '123'" :key="item">
        <!-- 没有扩展项 -->
        <!-- <EarningItem class="q-px-md" /> -->
        <!-- 有扩展项 -->
        <q-expansion-item dense group="group" expand-icon="img:statics/icons/arrow-up.png">
          <template v-slot:header>
            <EarningItem />
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
        <q-separator style="background: rgba(255,255,255,0.05)" />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import RechargeAddress from 'components/RechargeAddress'
import WithdrawForm from 'components/WithdrawForm'
import EarningItem from 'components/EarningItem'
export default {
  data() {
    return {
      showAddress: false, // 显示充币
      showWithDraw: false, // 显示提币表单
      address: '7197291729dhahhdehsss@BBbwallet'
    }
  },
  components: { RechargeAddress, WithdrawForm, EarningItem },
  methods: {
    withdrawConfirm(data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss">
// 上下箭头的padding
.q-item__section--side {
  padding: 0;
  img {
    width: 14px;
    height: 9px;
    margin-right: -9px;
    margin-left: 7px;
  }
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
