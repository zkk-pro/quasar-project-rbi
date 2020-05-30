<template>
  <div class="q-px-md" style="margin-bottom: 40px">
    <div class="q-mb-sm">RBI提币</div>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-py-lg q-px-md"
      style="background: rgba(255,255,255,0.05)"
    >
      <div class="q-mb-sm">提币币种</div>
      <q-input
        filled
        dense
        disable
        :style="nodeInputStyle"
        :input-style="{ color: '#fff' }"
        value="RBI"
      />
      <div class="q-mb-sm q-mt-md">提币地址</div>
      <q-input
        v-model="formData.address"
        filled
        dense
        :style="nodeInputStyle"
        :input-style="{ color: '#fff' }"
        placeholder="输入或长按粘贴地址"
      />
      <div class="q-mb-sm q-mt-md">提币数量</div>
      <q-input
        v-model="formData.amount"
        filled
        dense
        :style="nodeInputStyle"
        :input-style="{ color: '#fff' }"
        placeholder="最小提币数量100"
      >
        <template v-slot:append>
          <span class="text-white" style="font-size: 14px">RBI</span>
        </template>
        <template v-slot:after>
          <span
            class="all-btn row justify-center items-center"
            @click="allHandle"
            >全部</span
          >
        </template>
      </q-input>
      <div class="q-mt-sm text-grey-5" style="font-size:12px">
        可用：1000.12345678 RBI
      </div>
      <div class="q-mt-lg text-grey-4" style="font-size:14px">
        手续费：5 RBI
      </div>
      <div class="row justify-center" style="margin-top: 44px">
        <q-btn
          outline
          unelevated
          color="primary"
          label="取消"
          class="q-mr-lg"
          style="width: 120px; height:36px"
          @click="$emit('cancel')"
        />
        <q-btn
          unelevated
          color="primary"
          text-color="dark"
          label="确定"
          style="width: 120px; height:36px"
          @click="confirm"
        />
      </div>
    </q-form>

    <!-- 没有设置PIN弹框 -->
    <Dialog
      ref="unsetPINDialog"
      title="请设置PIN码"
      @confirm="unsetPINDialogHandle"
    >
      <div class="text-grey-8 q-px-lg">提币前请先设置PIN码</div>
    </Dialog>
    <!-- 设置PIN弹框 -->
    <Dialog
      ref="setPINDialog"
      title="请设置PIN码"
      @cancel="setPINDialogCancelHandle"
      @confirm="setPINDialogHandle"
      :confirmHold="setPINDHold"
    >
      <q-item>
        <q-input
          v-model="setPINForm.first"
          class="full-width"
          type="password"
          maxlength="6"
          dense
          placeholder="输入6位数字PIN码"
        />
      </q-item>
      <q-item>
        <q-input
          v-model="setPINForm.second"
          class="full-width"
          type="password"
          maxlength="6"
          dense
          placeholder="确定6位数字PIN码"
        />
      </q-item>
    </Dialog>
    <!-- 输入PIN码 -->
    <Dialog
      ref="inputPINDialog"
      title="请输入PIN码"
      @cancel="inputPINDialogCancelHandle"
      @confirm="inputPINDialogHandle"
      :confirmHold="inputPINHold"
    >
      <q-item>
        <q-item-section
          v-for="(item, index) in 6"
          :key="item"
          @click="inputPINFocus"
        >
          <q-input
            input-style="text-align:center;font-size: 60px"
            v-model="inputPINValue[index]"
            type="password"
            maxlength="1"
            readonly
          />
        </q-item-section>
      </q-item>

      <q-input
        type="text"
        v-model="inputPINValue"
        maxlength="6"
        invisible
        style="height:0;overflow:hidden"
        ref="inputPIN"
      />
    </Dialog>

    <!-- 安全验证弹框 -->
    <SafeValidate ref="SafeValidate" validType="google" />
  </div>
</template>

<script>
import Dialog from 'components/Dialog'
export default {
  inject: ['nodeInputStyle'],
  data() {
    return {
      formData: {
        address: '',
        amount: ''
      },
      // 设置PIN
      setPINForm: {
        first: '',
        second: ''
      },
      setPINDHold: true, // 设置PIN hold
      inputPINHold: true, // 输入PIN hold
      inputPINValue: '' // 输入的PIN 值
    }
  },
  components: { Dialog },
  methods: {
    // 全部按钮
    allHandle() {
      console.log(123)
    },
    xxx() {
      console.log(this.inputPINValue)
    },
    confirm() {
      this.$refs.inputPINDialog.open()
      this.inputPINFocus()
    },
    // 没有设置 PIN confirm 事件
    unsetPINDialogHandle() {
      console.log('设置密码点击确认')
      // this.$refs.SafeValidate.open()
      this.$refs.setPINDialog.open()
    },
    // 设置PIN confirm 事件
    setPINDialogHandle() {
      const { first, second } = this.setPINForm
      this.setPINValidFirst = first.length > 0
      if (!first.length > 0 || first.length < 6) {
        this.$q.notify({
          message: '请设置6位数PIN码',
          icon: 'warning',
          textColor: 'red'
        })
      } else if (first !== second) {
        this.$q.notify({
          message: '两次输入不一致',
          icon: 'warning',
          textColor: 'red'
        })
      } else {
        this.setPINDHold = false
      }
    },
    // 设置PIN cancel 事件
    setPINDialogCancelHandle() {
      this.setPINForm.first = ''
      this.setPINForm.second = ''
    },
    // 输入PIN confirm 事件
    inputPINDialogHandle() {
      if (!this.inputPINValue || this.inputPINValue.length < 6) {
        return this.$q.notify({
          message: '请输入6位数PIN码',
          icon: 'warning',
          textColor: 'red'
        })
      }
      console.log(123)
    },
    inputPINDialogCancelHandle() {
      this.inputPINValue = ''
    },
    inputPINFocus() {
      this.$nextTick(() => {
        this.$refs.inputPIN.focus()
      })
    },
    onReset() {},
    onSubmit() {}
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
</style>
