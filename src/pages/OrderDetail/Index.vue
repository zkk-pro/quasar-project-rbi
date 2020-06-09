<template>
  <div class="detail-container">
    <Breadcrumb class="col-xs-11 q-pl-lg lt-sm" />
    <div class="header relative-position row items-center">
      <!-- <img src="~assets/pc_images/p_order_bg.png" class="header_bg absolute" /> -->
      <div class="container relative-position">
        <div class="earning-total">
          <div class="q-mb-sm small-text">{{ $t('order_detail_income') }}</div>
          <Number
            class="lt-sm"
            :number="orderDetail.interestNumTodal || ''"
            big-size="36px"
            small-size="30px"
          />
          <Number
            class="gt-xs"
            :number="orderDetail.interestNumTodal || ''"
            big-size="50px"
            small-size="50px"
          />
        </div>
        <div class="row" style="margin-top: 35px">
          <div class="num-left">
            <div class="q-mb-sm small-text">
              {{ $t('order_detail_today_income') }}
            </div>
            <Number
              class="lt-sm"
              :number="orderDetail.interestNumToday || ''"
              big-size="30px"
              small-size="18px"
            />
            <Number
              class="gt-xs"
              :number="orderDetail.interestNumToday || ''"
              big-size="20px"
              small-size="14px"
            />
          </div>
          <div style="flex:1">
            <div class="q-mb-sm small-text">
              {{ $t('order_detail_locked') }}
            </div>
            <Number
              class="lt-sm"
              :number="orderDetail.num || ''"
              big-size="30px"
              small-size="18px"
            />
            <Number
              class="gt-xs"
              :number="orderDetail.num || ''"
              big-size="20px"
              small-size="14px"
            />
          </div>
        </div>
        <div class="header-btn row items-center">
          <div
            v-ripple
            class="btn unlock-btn row justify-center items-center cursor-pointer relative-position"
            @click="unlockHandle"
          >
            {{ $t('order_detail_unlocked') }}
          </div>
          <router-link
            v-ripple
            class="btn mining-btn row justify-center items-center relative-position"
            to="/mining"
          >
            {{ $t('order_detail_mining') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="list-container">
      <Breadcrumb class="col-xs-11 q-pl-lg gt-xs" />
      <q-list bordered class="list-box">
        <q-item clickable>
          <q-item-section>{{ $t('order_detail_node') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right"
            >V{{ orderDetail.name }}&nbsp;{{
              $t('order_detail_node_text')
            }}</q-item-section
          >
        </q-item>
        <q-item clickable>
          <q-item-section>{{ $t('order_detail_date') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.createTime | formatDate(true) }}
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>{{ $t('order_detail_yield') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{
              $i18n.locale == 'en-us'
                ? `${orderDetail.rate &&
                    (orderDetail.rate * 100).toFixed(2)}% of POS mining revenue`
                : `POS挖矿收益的${orderDetail.rate &&
                    (orderDetail.rate * 100).toFixed(2)}%`
            }}
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>{{ $t('order_detail_day') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.interestBeginTime | formatDate }}
          </q-item-section>
        </q-item>
        <q-item clickable v-if="orderDetail.interestEndTime">
          <q-item-section>{{ $t('order_detail_unlock_day') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.interestEndTime | formatDate(true) }}
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>{{ $t('order_detail_hold_day') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            {{ orderDetail.interestTimes }} {{ $t('order_detail_day_text') }}
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>{{ $t('order_detail_status') }}</q-item-section>
          <q-item-section class="pc_color text-grey-7" style="text-align:right">
            <span v-if="orderDetail.status === 0">{{ $t('com_over') }}</span>
            <span v-if="orderDetail.status === 1">{{ $t('com_Holding') }}</span>
            <span v-if="orderDetail.status === 2">{{
              $t('com_Unlocked')
            }}</span>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <Dialog ref="confirmDialog" :title="$t('order_detail_lock')" @confirm="onConfirm">
      <div class="row justify-center items-end" style="color:#333;font-size:15px">
        <!-- <strong>{{ currentNode.num }}</strong>RBI -->
        <span v-if="$i18n.locale === 'en-us'">Are you sure you want to unlock v{{ orderDetail.name }} node?</span>
        <span v-else>确定解锁v{{ orderDetail.name }}节点吗？</span>
      </div>
    </Dialog>
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
import Dialog from 'components/Dialog'
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
  components: { Number, SafeValidate, Breadcrumb, Dialog },
  filters: {
    formatDate(d, hasHM = false) {
      if (hasHM) {
        return date.formatDate(d, 'YYYY-MM-DD HH:mm')
      } else {
        return date.formatDate(d, 'YYYY-MM-DD')
      }
    }
  },
  methods: {
    onConfirm() {
      this.safeShow = true
    },
    async unlockHandle() {
      try {
        const { data } = await unlockAsk({ id: this.id })
        if (data.unlockEnable === 0) {
          return this.$q.notify({ message: this.$t('notify_lock') })
        } else if (data.unlockEnable === 2) {
          return
        }
        // 可以解锁
        this.$refs.confirmDialog.open()
        // this.safeShow = true
      } catch (error) {}
    },
    async onSafeConfirm(code) {
      try {
        await unlock({ id: this.id, code })
        this.$router.push({
          name: 'success',
          params: {
            text: this.$t('notify_lock_success'),
            path: '/mining-order'
          }
        })
      } catch (error) {}
    },
    async getOrderDetail() {
      const { data } = await getOrderDetail({ id: this.$route.query.id })
      this.orderDetail = data
    }
  },
  created() {
    console.log(this.$i18n.locale)
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
  .small-text {
    font-size: 12px;
  }
  .num-left{
    flex: 1;
    margin-right: 0;
  }
}
.num-left{
    margin-right: 126px;
  }
.small-text {
  font-size: 16px;
}
.container {
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
@media screen and (min-width: 599px) {
  .breadcrumb {
    height: 62px;
    line-height: 62px;
  }
  .pc_color {
    color: #fff !important;
  }
  .header-btn{
    width: 240px;
    bottom: 0;
    left: unset;
    right: 0;
    color: #124967;
    background-color: transparent;
    .btn{
      width:100px;
      border-radius: 20px;
      background-color: #fff;
      &:nth-child(1){
        margin-right: 40px;
      }
    }
    .mining-btn::after{
      display: none;
    }
  }
}
</style>
