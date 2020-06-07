<template>
  <div class="q-px-md recharge-box">
    <div class="q-mb-sm pc_title">{{$t('assets_withdrawRBI')}}</div>
    <q-form @submit="onSubmit" class="q-py-lg q-px-md draw-form">
      <div class="q-mb-sm">{{$t('assets_withdraw_type')}}</div>
      <q-input
        filled
        dense
        disable
        :style="nodeInputStyle"
        :input-style="{ color: '#fff' }"
        value="RBI"
      />
      <div class="q-mb-sm q-mt-md">{{$t('assets_withdraw_address')}}</div>
      <q-input
        v-model="formData.address"
        filled
        dense
        :style="nodeInputStyle"
        :input-style="{ color: '#fff' }"
        :placeholder="$t('assets_placeholder')"
      />
      <div class="q-mb-sm q-mt-md">{{$t('assets_withdraw_num')}}</div>
      <q-input
        v-model="formData.amount"
        type="number"
        filled
        dense
        :style="nodeInputStyle"
        :input-style="{ color: '#fff' }"
        :placeholder="lang == 'en-us' ? `Minimum withdrawal amount ${config.withdrawMinNum}` : `最小提币数量${config.withdrawMinNum}`"
      >
        <template v-slot:append>
          <span class="text-white" style="font-size: 14px">RBI</span>
        </template>
        <template v-slot:after>
          <span
            class="all-btn row justify-center items-center"
            @click="allHandle"
          >
            {{$t("assets_all")}}
          </span>
        </template>
      </q-input>
      <div class="q-mt-sm text-grey-5" style="font-size:12px">
        {{$t('assets_available')}}：{{ config.balance }} RBI
      </div>
      <div class="q-mt-lg text-grey-4" style="font-size:14px">
        {{$t('assets_fee')}}：{{ config.withdrawFeeRate }} RBI
      </div>
      <div class="row justify-center" style="margin-top: 44px">
        <q-btn
          outline
          unelevated
          no-caps
          color="primary"
          :label="$t('com_cancel')"
          class="q-mr-lg"
          style="width: 120px; height:36px"
          @click="$emit('cancel')"
        />
        <q-btn
          unelevated
          type="submit"
          no-caps
          color="primary"
          text-color="dark"
          :label="$t('com_confirm')"
          style="width: 120px; height:36px"
        />
      </div>
    </q-form>

    <!-- 没有设置PIN弹框 -->
    <Dialog
      ref="unsetPINDialog"
      :title="$t('assets_setpin')"
      @confirm="unsetPINDialogHandle"
    >
      <div class="text-grey-8 q-px-lg">{{$t('assets_setpin_first')}}</div>
    </Dialog>
    <!-- 设置PIN弹框 -->
    <SetPIN
      :show="setPINShow"
      @success="onSetPINSuccess"
      @cancel="onSetPINCancel"
    />
    <!-- 输入PIN码 -->
    <Dialog
      ref="inputPINDialog"
      :title="$t('assets_enterpin')"
      @cancel="inputPINValue = ''"
      @confirm="inputPINDialogHandle"
      :confirmHold="true"
    >
      <q-form ref="inputPINVForm">
        <q-input
          v-model="inputPINValue"
          maxlength="6"
          type="password"
          autofocus
          :input-style="{ textAlign: 'center' }"
          no-error-icon
          lazy-rules
          :rules="[val => (!!val && !(val.length < 6)) || $t('assets_enterpin')]"
        />
      </q-form>
      <template v-slot:leftBottom>
        <span
          class="row items-center full-height q-ml-sm"
          style="color:#666; font-size:13px"
          @click="forgetPIN"
        >
          {{$t('assets_forgetpin')}}
        </span>
      </template>
    </Dialog>
    <!-- 安全验证弹框 -->
    <SafeValidate
      :show.sync="safeShow"
      :validType="$store.getters.userinfo.securityLevel"
      @safeConfirm="onSafeConfirm"
    />
  </div>
</template>

<script>
import Dialog from 'components/Dialog'
import SetPIN from 'components/SetPIN'
import { withdraw } from 'src/api/apiList'
export default {
  inject: ['nodeInputStyle'],
  props: {
    config: Object
  },
  data() {
    return {
      safeShow: false, // 安全验证弹框
      formData: {
        address: '',
        amount: ''
      },
      setPINShow: false, // 显示设置PIN弹框
      inputPINValue: '', // 输入的PIN 值
      PIN: '', // 输入的PIN 值
      lang: ''
    }
  },
  components: { Dialog, SetPIN },
  mounted() {
    this.lang = this.$i18n.locale
  },
  methods: {
    notify(message) {
      this.$q.notify({
        message,
        icon: 'warning',
        textColor: 'red'
      })
    },
    // 全部按钮
    allHandle() {
      this.formData.amount = this.config.balance
    },
    // 没有设置 PIN confirm 事件：显示设置PIN弹框
    unsetPINDialogHandle() {
      this.setPINShow = true
    },
    // 设置PIN成功
    onSetPINSuccess() {
      this.setPINShow = false
    },
    // 设置PIN 取消
    onSetPINCancel() {
      this.setPINShow = false
    },
    // 忘记PIN
    forgetPIN() {
      this.inputPINValue = ''
      this.$refs.inputPINDialog.close()
      this.setPINShow = true
    },
    // 输入PIN confirm 事件
    inputPINDialogHandle() {
      const res = this.$refs.inputPINVForm.validate()
      if (res) {
        this.PIN = this.inputPINValue
        this.inputPINValue = ''
        this.$refs.inputPINDialog.close()
        this.safeShow = true
      }
    },
    // 安全验证 confirm 事件
    async onSafeConfirm(code) {
      try {
        await withdraw({
          num: this.formData.amount,
          walletAddress: this.formData.address,
          pinCode: this.PIN,
          code
        })
        this.$router.push({ name: 'success', params: { text: this.$t('com_submit_success') } })
      } catch (error) {}
    },
    inputPINFocus() {
      this.$nextTick(() => {
        this.$refs.inputPIN.focus()
      })
    },

    onSubmit() {
      if (!this.formData.address) {
        return this.notify(`${this.$t('com_enter')}${this.$t('assets_withdraw_address')}`)
      } else if (!this.formData.amount) {
        return this.notify(`${this.$t('com_enter')}${this.$t('assets_withdraw_num')}`)
      } else if (
        Number(this.formData.amount) < Number(this.config.withdrawMinNum)
      ) {
        return this.notify(`${this.$t('notify_withdraw_num')}${this.config.withdrawMinNum}`)
      } else if (Number(this.formData.amount) > Number(this.config.balance)) {
        return this.notify(this.$t('notify_withdraw_num_lt'))
      }
      // 是否可提币
      if (!this.config.withdrawStatus) {
        return this.$q.notify({
          message: this.config.withdrawStatusMessage,
          icon: 'warning',
          textColor: 'red'
        })
      }
      // 设置过PointerEvent
      if (this.$store.getters.userinfo.securityIsBind) {
        this.$refs.inputPINDialog.open()
      } else {
        this.$refs.unsetPINDialog.open()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.all-btn {
  height: 100%;
  width: 47px;
  font-size: 14px;
  text-align: center;
  color: #fff;
  position: relative;
}
.recharge-box {
  margin-bottom: 40px;
}
.draw-form {
  background: rgba(255, 255, 255, 0.05);
}
@media screen and (min-width: 599px) {
  .recharge-box {
    width: 670px;
    height: 512px;
    margin: 8px auto 40px;
  }
  .draw-form {
    padding: 62px 135px;
    background: rgba(26, 26, 60, 1);
  }
  .pc_title {
    margin-bottom: 20px;
  }
}
</style>
