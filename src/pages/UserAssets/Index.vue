<template>
  <q-page class="q-pb-xl">
    <div class="header column justify-center items-center">
      <div class="header-text">{{$t('assets_total')}}</div>
      <div class="header-number">{{ totalAndConfig.balance }}</div>
      <div class="header-btn row items-center ">
        <div
          v-ripple
          class="btn withdraw-btn row justify-center items-center relative-position cursor-pointer"
          to="/mining"
          @click=";[(showWithDraw = false), (showAddress = !showAddress)]"
        >
          {{$t('assets_recharge')}}
        </div>
        <div
          v-ripple
          class="btn recharge-btn row justify-center items-center relative-position cursor-pointer"
          @click=";[(showAddress = false), (showWithDraw = !showWithDraw)]"
        >
          {{$t('assets_withdraw')}}
        </div>
      </div>
    </div>
    <!-- 充币 -->
    <RechargeAddress
      :address="totalAndConfig.address"
      :qrcode="totalAndConfig.addressQrCode"
      v-if="showAddress"
    />
    <!-- 提币 -->
    <WithdrawForm
      v-if="showWithDraw"
      :config="totalAndConfig"
      @cancel="showWithDraw = false"
      @confirm="withdrawConfirm"
    />
    <!-- 交易记录 -->
    <div class="container">
      <q-list style="background: rgba(255,255,255,0.05)">
        <q-item-label
          header
          class="q-pt-none q-pb-md"
          style="background: #1B1F41"
        >
          {{$t('assets_record')}}
        </q-item-label>
        <div v-for="item in logList" :key="item.id">
          <!-- 有扩展项 -->
          <q-expansion-item
            v-if="item.txid"
            dense
            group="group"
            expand-icon="img:statics/icons/arrow-up.png"
          >
            <template v-slot:header>
              <EarningItem :itemData="item" />
            </template>
            <q-card style="background: #1B1F41">
              <q-card-section class="content" style="">
                <div class="q-mb-xs">{{$t('assets_address')}}:</div>
                <div class="q-mb-lg">
                  {{ item.address }}
                </div>
                <div class="q-mb-xs">{{$t('assets_id')}}:</div>
                <div>
                  {{ item.txid }}
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <!-- 没有扩展项 -->
          <EarningItem v-else class="q-px-md" :itemData="item" />
          <q-separator style="background: rgba(255,255,255,0.05)" />
        </div>
      </q-list>
      <q-pagination
        class="q-mt-md row justify-center"
        v-model="params.paging"
        v-if="logList.length"
        :max="pageInfo.pageMax || 1"
        direction-links
        @input="pageChange"
        size="12px"
      />
    </div>
  </q-page>
</template>

<script>
import RechargeAddress from 'components/RechargeAddress'
import WithdrawForm from 'components/WithdrawForm'
import EarningItem from 'components/EarningItem'
import { getAssets } from 'src/api/apiList'
export default {
  data() {
    return {
      showAddress: false, // 显示充币
      showWithDraw: false, // 显示提币表单
      params: {
        paging: 1,
        limit: 5
      },
      totalAndConfig: {}, // 总资产和配置
      logList: [], // 交易记录
      pageInfo: {} // 分页数据
    }
  },
  components: { RechargeAddress, WithdrawForm, EarningItem },
  methods: {
    // 页面改变
    pageChange(value) {
      this.getAssets()
    },
    withdrawConfirm(data) {
      console.log(data)
    },
    async getAssets() {
      const { data } = await getAssets(this.params)
      this.logList = data.list
      if (this.params.paging === 1) {
        this.totalAndConfig = data.asset
        this.pageInfo = data.pagination
      }
    }
  },
  created() {
    this.getAssets()
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
.screen--xs {
  .header {
    height: 162px;
    background: url('~assets/images/assets-bg.png');
    background-size: 100% 100%;
  }
}
.header {
  height: 200px;
  background: url('~assets/pc_images/q-assets-bg.png');
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
  width: 190px;
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
