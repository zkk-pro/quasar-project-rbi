<template>
  <div>
    <Dialog
      ref="setPINDialog"
      :title="$t('assets_setpin')"
      @hide="onSetPINDialogHide"
      @confirm="setPINDialogHandle"
      :confirmHold="true"
    >
      <q-form class="q-px-md" ref="setPINDialogForm">
        <q-input
          v-model="setPINForm.first"
          class="full-width"
          type="password"
          maxlength="6"
          dense
          :placeholder="$t('assets_enterpin')"
          no-error-icon
          lazy-rules
          :rules="[val => (!!val && !(val.length < 6)) || $t('assets_enterpin')]"
        />
        <q-input
          v-model="setPINForm.second"
          class="full-width"
          type="password"
          maxlength="6"
          dense
          :placeholder="$t('assets_confirm_pin')"
          no-error-icon
          lazy-rules
          :rules="[val => val === setPINForm.first || $t('com_enter_notsame')]"
        />
      </q-form>
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
import { setPIN } from 'src/api/apiList'
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      setPINForm: {
        first: '',
        second: ''
      },
      PINPwd: '', // 设置的PIN密码
      safeShow: false // 安全验证弹框
    }
  },
  components: { Dialog },
  methods: {
    // 设置PIN confirm 事件
    async setPINDialogHandle() {
      console.log(this.$refs.setPINDialogForm)
      const res = await this.$refs.setPINDialogForm.validate()
      if (res) {
        this.PINPwd = this.setPINForm.first
        this.$refs.setPINDialog.close()
        this.safeShow = true
      }
    },
    // 设置PIN 隐藏 事件
    onSetPINDialogHide() {
      this.setPINForm.first = ''
      this.setPINForm.second = ''
      this.cancel()
    },
    cancel() {
      this.$emit('cancel')
    },
    // 安全验证 confirm 事件
    async onSafeConfirm(code) {
      try {
        await setPIN({ pinCode: this.PINPwd, code })
        await this.$store.dispatch('UpdateUserInfo')
        this.$emit('success')
        this.safeShow = false
        this.$q.notify({
          message: this.$t('notify_setting_success'),
          icon: 'done',
          textColor: 'green'
        })
      } catch (error) {}
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.$refs.setPINDialog.open()
      } else {
        this.$refs.setPINDialog.close()
      }
    },
    safeShow(val) {
      if (!val) this.cancel()
    }
  }
}
</script>

<style lang="scss" scoped></style>
