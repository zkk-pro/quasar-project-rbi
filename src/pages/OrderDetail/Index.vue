<template>
  <div class="detail-container">
    <Breadcrumb class="col-xs-11 q-pl-lg lt-sm" />
    <div class="header relative-position row items-center">
      <!-- <img src="~assets/pc_images/p_order_bg.png" class="header_bg absolute" /> -->
      <div class="container">
        <div class="earning-total">
          <div class="q-mb-sm" style="font-size: 12px;">累积收益</div>
          <Number
            :number="orderDetail.interestNumTodal || ''"
            big-size="36px"
            small-size="30px"
          />
        </div>
        <div class="row" style="margin-top: 35px">
          <div style="flex:1">
            <div class="q-mb-sm" style="font-size: 12px;">今日收益</div>
            <Number
              :number="orderDetail.interestNumToday || ''"
              big-size="30px"
              small-size="18px"
            />
          </div>
          <div style="flex:1">
            <div class="q-mb-sm" style="font-size: 12px;">锁仓RBI</div>
            <Number
              :number="orderDetail.num || ''"
              big-size="30px"
              small-size="18px"
            />
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
          >
            挖矿
          </router-link>
        </div>
      </div>
    </div>
    <div class="list-container">
      <Breadcrumb class="col-xs-11 q-pl-lg gt-xs" />
      <q-list bordered class="list-box">
        <q-item clickable>
          <q-item-section>锁仓节点</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right"
            >V{{ orderDetail.name }}节点</q-item-section
          >
        </q-item>
        <q-item clickable>
          <q-item-section>锁仓日期</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.createTime | formatDate(true) }}
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>锁仓收益率</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            POS挖矿收益的{{ orderDetail.rate && orderDetail.rate * 100 }}%
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>起息日</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.interestBeginTime | formatDate }}
          </q-item-section>
        </q-item>
        <q-item clickable v-if="orderDetail.interestEndTime">
          <q-item-section>解锁日期</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.interestEndTime | formatDate(true) }}
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>持有天数</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.interestTimes }} 天
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>状态</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.status | transStatus }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <SafeValidate
      :show.sync="safeShow"
      :validType="$store.getters.userinfo.securityLevel"
      @safeConfirm="onSafeConfirm"
    />
  </div>
</template>

<script>
import Number from 'components/Number'
import SafeValidate from 'components/SafeValidate'
import Breadcrumb from 'components/Breadcrumb'
import { getOrderDetail, unlockAsk, unlock } from 'src/api/apiList'
import { date } from 'quasar'

export default {
  data() {
    return {
      id: 0,
      safeShow: false, // 安全验证弹框
      orderDetail: {} // 订单详情数据
    }
  },
  components: { Number, SafeValidate, Breadcrumb },
  filters: {
    formatDate(d, hasHM = false) {
      if (hasHM) {
        return date.formatDate(d, 'YYYY-MM-DD HH:mm')
      } else {
        return date.formatDate(d, 'YYYY-MM-DD')
      }
    },
    transStatus(status) {
      if (status === 0) {
        return '已结束'
      } else if (status === 1) {
        return '持有中'
      } else if (status === 2) {
        return '已解锁'
      }
    }
  },
  methods: {
    async unlockHandle() {
      try {
        const { data } = await unlockAsk({ id: this.id })
        if (data.unlockEnable === 0) {
          return this.$q.notify({ message: '锁仓24小时内不可以进行解锁 !' })
        } else if (data.unlockEnable === 2) {
          return this.$q.notify({ message: '该订单已解锁 !' })
        }
        // 可以解锁
        this.safeShow = true
      } catch (error) {}
    },
    async onSafeConfirm(code) {
      try {
        await unlock({ id: this.id, code })
        this.$router.push({ name: 'success', params: { text: '解锁成功' } })
      } catch (error) {}
    },
    async getOrderDetail() {
      const { data } = await getOrderDetail({ id: this.$route.query.id })
      this.orderDetail = data
    }
  },
  created() {
    // console.log(this.$store.getters.userinfo)
    this.validType = this.$store.getters.userinfo.securityLevel
    this.id = this.$route.query.id
    this.getOrderDetail()
  }
}
</script>

<style lang="scss" scoped>
.screen--xs {
  .list-container {
    padding: 0 135px;
    width: 100%;
    padding: 0;
    background: initial;
    margin-top: 55px;
  }
  .list-box {
    padding: 0;
  }
  .header {
    height: 216px;
    background: url('~assets/images/order-detail-bg.png');
    background-size: 100% 100%;
    align-items: initial;
  }
}
.container{
  width: 800px;
}
.list-container {
  width: 670px;
  height: 480px;
  margin: 0 auto;
}
.list-box {
  padding: 40px 135px;
  background: rgba(26, 26, 60, 1);
}
@media screen and (min-width: 599px) {
  .breadcrumb {
    height: 62px;
    line-height: 62px;
  }
  .pc_color {
    color: #fff !important;
  }
}
.header {
  width: 100%;
  height: 300px;
  padding: 25px 30px;
  background: url('~assets/pc_images/p_order_bg.png');
  background-size: 100% 100%;
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
