<template>
  <div class="detail-container">
    <div class="header relative-position">
      <div class="earning-total">
        <div class="q-mb-sm" style="font-size: 12px;">累积收益</div>
        <Number :number="123.01" big-size="36px" small-size="30px" />
      </div>
      <div class="row" style="margin-top: 35px">
        <div style="flex:1">
          <div class="q-mb-sm" style="font-size: 12px;">今日收益</div>
          <Number :number="123.01" big-size="30px" small-size="18px" />
        </div>
        <div style="flex:1">
          <div class="q-mb-sm" style="font-size: 12px;">锁仓RBI</div>
          <Number :number="123.01" big-size="30px" small-size="18px" />
        </div>
      </div>
      <div class="header-btn row items-center">
        <div
          v-ripple
          class="btn unlock-btn row justify-center items-center cursor-pointer relative-position"
          @click="unlockHandle"
        >
          解锁
        </div>
        <router-link
          v-ripple
          class="btn mining-btn row justify-center items-center relative-position"
          to="/mining"
          >挖矿</router-link
        >
      </div>
    </div>
    <q-list bordered style="margin-top: 55px">
      <q-item clickable>
        <q-item-section>锁仓节点</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >V2节点</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section>锁仓日期</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >2020-05-05 11:11</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section>锁仓收益率</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >POS挖矿收益的80%</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section>起息日</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >2020-05-06</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section>解锁日期</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >2020-05-05 11:11</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section>持有天数</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >10 天</q-item-section
        >
      </q-item>
      <q-item clickable>
        <q-item-section>状态</q-item-section>
        <q-item-section class="text-grey-7" style="text-align:right"
          >已结束</q-item-section
        >
      </q-item>
    </q-list>
    <SafeValidate ref="safe" validType="google" />
  </div>
</template>

<script>
import Number from 'components/Number'
import SafeValidate from 'components/SafeValidate'
export default {
  components: { Number, SafeValidate },
  methods: {
    unlockHandle() {
      // 不能解锁
      // this.$q.notify({ message: '锁仓24小时内不可以进行解锁 !' })
      // 可以解锁
      // this.$refs.safe.open()
      // 成功
      this.$router.push({ name: 'success', params: { text: '解锁成功' } })
    }
  },
  created() {
    console.log(123)
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 216px;
  background: url('~assets/images/order-detail-bg.png');
  background-size: 100% 100%;
  padding: 25px 30px;
}
.header-btn {
  width: 153px;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  color: $primary;
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
  .unlock-btn {
    &::before {
      background: url('~assets/images/unlock-btn.png');
      background-size: 100% 100%;
    }
  }
  .mining-btn {
    &::before {
      background: url('~assets/images/mining-btn.png');
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
</style>
