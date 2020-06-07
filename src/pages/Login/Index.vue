<template>
  <q-page class="q-px-lg row justify-center">
    <div class="form-box">
      <div class="title">登录RBI</div>
      <q-form @submit="onSubmit" style="margin-top: 35px" ref="login">
        <q-input
          v-model="loginForm.account"
          class="full-width"
          type="text"
          label="手机号/邮箱"
          :input-style="{ color: 'white' }"
          no-error-icon
          :rules="[val => !!val || '请输入手机号/邮箱']"
        />
        <q-input
          v-model="loginForm.password"
          class="full-width "
          :type="pwdVisible ? 'text' : 'password'"
          label="登录密码"
          :input-style="{ color: 'white' }"
          no-error-icon
          :rules="[val => !!val || '请输入登录密码']"
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
          label="登录"
          class="btn-style full-width"
          style="margin-top:60px"
        />
      </q-form>
      <q-list>
        <q-item class="q-mt-md">
          <q-item-section class="text-right text-primary q-mr-lg">
            <span class="cursor-pointer" @click="forgetPwd">忘记密码</span>
          </q-item-section>
          <q-separator inset vertical class="bg-primary" />
          <q-item-section class="text-primary q-ml-lg">
            <router-link to="/registry">用户注册</router-link>
          </q-item-section>
        </q-item>
      </q-list>

      <!-- 忘了密码一系列弹框 -->
      <!-- 确认框 -->
      <Dialog title="重置登录密码" ref="resetTip" @confirm="resetTipCofirm">
        <div class="q-pl-md" style="font-size:14px; color: #666">
          重置登录密码后，24小时内无法提币
        </div>
      </Dialog>
      <!-- 账号输入 -->
      <Dialog
        title="重置登录密码"
        ref="resetInput"
        confirmHold
        @confirm="resetInputCofirm"
        @hide="forgetAccount = ''"
      >
        <q-input
          class="q-px-md"
          v-model="forgetAccount"
          autofocus
          label="请输入邮箱或手机号"
          lazy-rules
          no-error-icon
          :error="resetInputErr && !forgetAccount.length"
          error-message="请输入邮箱或手机号"
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
        title="设置新登录密码"
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
            label="请设置登录密码"
            lazy-rules
            no-error-icon
            :rules="[
              val => !!val || '请设置登录密码',
              val => !(val.length < 6) || '密码不能小于6位数'
            ]"
          />
          <q-input
            v-model="newPwdForm.second"
            type="password"
            dense
            label="请再次输入登录密码"
            lazy-rules
            no-error-icon
            :rules="[val => val === newPwdForm.first || '两次输入不一致']"
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
      }
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
      this.$refs.resetTip.open()
    },
    // 忘记密码确认弹框 confirm
    resetTipCofirm() {
      this.$refs.resetInput.open()
    },
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
    onSafeConfirm(code) {
      this.resetPwdParams.validCode = code
      this.safeShow = false
      this.$refs.resetSetPwd.open()
    },
    // 设置新密码
    async resetSetPwdCofirm() {
      const res = await this.$refs.newPwdForm.validate()
      if (res) {
        try {
          await resetPwd({
            account: this.resetPwdParams.account,
            password: this.newPwdForm.first,
            code: this.resetPwdParams.validCode
          })
          this.$q.notify({
            message: '修改成功',
            icon: 'done',
            textColor: 'green'
          })
          this.$refs.resetSetPwd.close()
        } catch (error) {}
      }
    },
    async onSubmit() {
      const res = await this.$refs.login.validate()
      if (res) {
        await this.$store.dispatch('Login', this.loginForm)
        await this.$store.dispatch('UpdateUserInfo')
        this.$router.push({ path: this.fromPath })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/css/login-registry.scss';
</style>
