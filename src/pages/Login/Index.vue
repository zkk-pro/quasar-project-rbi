<template>
  <q-page class="q-px-lg row justify-center">
    <div class="form-box">
      <div class="title">{{ $t('login_title') }}</div>
      <q-form @submit="onSubmit" style="margin-top: 35px" ref="login">
        <q-input
          v-model="loginForm.account"
          class="full-width"
          type="text"
          :maxlength="32"
          :label="$t('com_mobile') + '/' + $t('com_email')"
          :input-style="{ color: 'white' }"
          no-error-icon
          :rules="[val => !!val || $t('com_enter_phone_or_mail')]"
        />
        <q-input
          v-model="loginForm.password"
          class="full-width "
          :type="pwdVisible ? 'text' : 'password'"
          :label="$t('login_password')"
          :input-style="{ color: 'white' }"
          no-error-icon
          :rules="[val => !!val || $t('login_enter_password')]"
        >
          <template v-slot:append>
            <div
              class="q-pr-md"
              :class="pwdVisible ? 'pwd-visible' : 'pwd-invisible'"
              @click="pwdVisible = !pwdVisible"
            ></div>
          </template>
        </q-input>
        <q-btn
          type="submit"
          color="primary"
          text-color="dark"
          rounded
          unelevated
          :disable="loginForm.password.length < 6"
          no-caps
          :label="$t('login_login')"
          class="btn-style full-width"
          style="margin-top:60px"
        />
      </q-form>
      <q-list>
        <q-item class="q-mt-md">
          <q-item-section class="text-right text-primary q-mr-lg">
            <span class="cursor-pointer" @click="forgetPwd">{{
              $t('login_forget_password')
            }}</span>
          </q-item-section>
          <q-separator inset vertical class="bg-primary" />
          <q-item-section class="text-primary q-ml-lg">
            <router-link to="/registry">{{ $t('login_register') }}</router-link>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 忘了密码一系列弹框 -->
      <!-- 确认框 -->
      <!-- <Dialog :title="$t('login_reset')" ref="resetTip" @confirm="resetTipCofirm">
        <div class="q-pl-md" style="font-size:14px; color: #666">
          {{$t('login_reset_watch')}}
        </div>
      </Dialog> -->
      <!-- 账号输入 -->
      <Dialog
        :title="$t('login_reset')"
        ref="resetInput"
        confirmHold
        @confirm="resetInputCofirm"
        @hide="forgetAccount = ''"
      >
        <q-input
          class="q-px-md"
          v-model="forgetAccount"
          autofocus
          :label="$t('com_enter_phone_or_mail')"
          lazy-rules
          no-error-icon
          :error="resetInputErr && !forgetAccount.length"
          :error-message="$t('com_enter_phone_or_mail')"
        />
      </Dialog>
      <!-- 安全验证 -->
      <SafeValidate
        :show.sync="safeShow"
        :validType="securityLevel"
        @safeConfirm="onSafeConfirm"
      />
      <!-- 设置新的密码 -->
      <Dialog
        :title="$t('login_reset_password')"
        ref="resetSetPwd"
        confirmHold
        @confirm="resetSetPwdCofirm"
        @hide=";[(newPwdForm.first = ''), (newPwdForm.second = '')]"
      >
        <q-form ref="newPwdForm" class="q-px-md">
          <q-input
            v-model="newPwdForm.first"
            type="password"
            dense
            :label="$t('com_set_password')"
            lazy-rules
            no-error-icon
            :rules="[
              val => !!val || $t('com_set_password'),
              val => !(val.length < 6) || $t('com_password_lessthan_six')
            ]"
          />
          <q-input
            v-model="newPwdForm.second"
            type="password"
            dense
            :label="$t('com_enter_password_again')"
            lazy-rules
            no-error-icon
            :rules="[
              val => val === newPwdForm.first || $t('com_enter_notsame')
            ]"
          />
        </q-form>
      </Dialog>
    </div>
  </q-page>
</template>

<script>
import Dialog from 'components/Dialog'
import { getAccountSafeLevel, resetPwd } from 'src/api/apiList'
export default {
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      pwdVisible: false,
      fromPath: '/',
      resetInputErr: false,
      forgetAccount: '',
      securityLevel: 1, // 安全验证类别
      safeShow: false,
      resetPwdParams: {
        account: '',
        validCode: ''
      },
      newPwdForm: {
        first: '',
        second: ''
      },
      isLogin: false
    }
  },
  components: { Dialog },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromPath = from.path
    })
  },
  methods: {
    // 忘记密码
    forgetPwd() {
      // this.$refs.resetTip.open()
      this.isLogin = false
      this.$refs.resetInput.open()
    },
    // 忘记密码确认弹框 confirm
    // resetTipCofirm() {
    //   this.$refs.resetInput.open()
    // },
    // 输入手机号/邮箱
    async resetInputCofirm() {
      if (!this.forgetAccount) {
        return (this.resetInputErr = true)
      }
      try {
        const { data } = await getAccountSafeLevel({
          account: this.forgetAccount
        })
        this.securityLevel = data.securityLevel
        this.$store.dispatch('SetUserInfo', data)
        this.resetPwdParams.account = this.forgetAccount
        this.$refs.resetInput.close()
        this.safeShow = true
      } catch (error) {}
    },
    // 安全验证
    async onSafeConfirm(code) {
      if (this.isLogin) {
        const res = await this.$refs.login.validate()
        if (res) {
          this.loginForm.code = code
          await this.$store.dispatch('Login', this.loginForm)
          await this.$store.dispatch('UpdateUserInfo')
          this.$router.push({ path: this.fromPath })
        }
      } else {
        this.resetPwdParams.validCode = code
        this.safeShow = false
        this.$refs.resetSetPwd.open()
      }
    },
    notify(message) {
      this.$q.notify({ message, icon: 'warning', textColor: 'red' })
    },
    // 设置新密码
    async resetSetPwdCofirm() {
      const res = await this.$refs.newPwdForm.validate()
      if (res) {
        if (
          !/^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,20}$/.test(
            this.newPwdForm.first
          )
        ) {
          return this.notify(this.$t('register_password'))
        }
        try {
          await resetPwd({
            account: this.resetPwdParams.account,
            password: this.newPwdForm.first,
            code: this.resetPwdParams.validCode
          })
          this.$q.notify({
            message: this.$t('com_modify_success'),
            icon: 'done',
            textColor: 'green'
          })
          this.$refs.resetSetPwd.close()
        } catch (error) {}
      }
    },
    async onSubmit() {
      try {
        const { data } = await getAccountSafeLevel({
          account: this.loginForm.account
        })
        this.securityLevel = data.securityLevel
        this.$store.dispatch('SetUserInfo', data)
        this.isLogin = true
        this.safeShow = true
      } catch (err) {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/css/login-registry.scss';
</style>
