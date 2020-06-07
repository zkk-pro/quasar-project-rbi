<template>
  <q-page class="q-px-lg row justify-center">
    <div class="form-box">
      <div class="title">注册RBI</div>
      <div class="registry-type cursor-pointer">
        <span
          :class="{ active: registryType === 'mobile' }"
          @click="switchType('mobile')"
          >手机注册</span
        >
        <span
          :class="{ active: registryType === 'email' }"
          @click="switchType('email')"
          >邮箱注册</span
        >
      </div>
      <q-form @submit="onSubmit" class="q-mt-md" ref="registry">
        <q-input
          ref="account"
          v-model="registryForm.account"
          type="text"
          :label="registryType === 'email' ? '邮箱' : '手机号'"
          :input-style="{ color: 'white' }"
          :maxlength="registryType === 'email' ? '' : 11"
          filled
          dense
          no-error-icon
          lazy-rules
          :rules="[
            val =>
              !!val || `请输入${registryType === 'email' ? '邮箱' : '手机号'}`
          ]"
        />
        <q-input
          v-model="registryForm.code"
          type="text"
          label="验证码"
          :input-style="{ color: 'white' }"
          maxlength="6"
          filled
          lazy-rules
          no-error-icon
          dense
          :rules="[
            val => !!val || '请输入验证码',
            val => !(val.length < 6) || '请输入6位数验证码'
          ]"
        >
          <template v-slot:append>
            <q-btn
              style="width: 80px"
              flat
              dense
              :disable="m_btnDisable"
              color="primary"
              :label="m_btnText"
              @click="getCode"
            />
          </template>
        </q-input>
        <q-input
          v-model="registryForm.password"
          :type="passwordVisible ? 'text' : 'password'"
          :input-style="{ color: 'white' }"
          label="请设置登录密码"
          maxlength="20"
          filled
          lazy-rules
          no-error-icon
          dense
          :rules="[
            val => !!val || '请输入密码',
            val => !(val.length < 6) || '密码不能低于6位数',
            val =>
              /^(?=.*?[a-z)(?=.*>[A-Z])(?=.*?[0-9])[a-zA_Z0-9]{6,20}$/.test(
                val
              ) || '登入密码6-20位，由字母和数字组成'
          ]"
        >
          <template v-slot:append>
            <span
              :class="passwordVisible ? 'pwd-visible' : 'pwd-invisible'"
              @click="passwordVisible = !passwordVisible"
            ></span>
          </template>
        </q-input>
        <q-input
          v-model="registryForm.passwordAgen"
          :type="passwordAgenVisible ? 'text' : 'password'"
          label="请再次输入登录密码"
          :input-style="{ color: 'white' }"
          filled
          dense
          lazy-rules
          no-error-icon
          :rules="[val => val === registryForm.password || '两次密码不一致']"
        >
          <template v-slot:append>
            <span
              :class="passwordAgenVisible ? 'pwd-visible' : 'pwd-invisible'"
              @click="passwordAgenVisible = !passwordAgenVisible"
            ></span>
          </template>
        </q-input>
        <router-link class="q-mt-sm text-primary inline-block" to="/login"
          >已有账号，去登录></router-link
        >
        <q-btn
          type="submit"
          unelevated
          rounded
          color="primary"
          text-color="dark"
          label="注册"
          class="btn-style full-width"
          style="margin-top:60px"
        />
        <div class="q-mt-lg row justify-center items-center">
          <q-checkbox v-model="checked" dense keep-color color="primary">
            <div class="protocol">
              我已阅读并同意<span class="text-primary" @click.stop="toProtocal"
                >《用户协议》</span
              >
            </div>
          </q-checkbox>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { registry } from 'src/api/apiList'
import codeValid from 'src/mixins/codeValid'

export default {
  data() {
    return {
      registryType: 'mobile', // 0：手机；1：邮箱
      registryForm: {
        type: 'mobile',
        account: '',
        code: '',
        password: '',
        passwordAgen: ''
      },
      checked: true, // 同意用户协议
      passwordVisible: false,
      passwordAgenVisible: false
    }
  },
  mixins: [codeValid],
  methods: {
    // 切换注册类型
    switchType(type) {
      this.$refs.registry.resetValidation()
      this.registryType = type
      this.resetForm()
    },
    // 表单重置
    resetForm() {
      for (const key in this.registryForm) {
        this.registryForm[key] = ''
      }
    },
    // 提示
    notify(message) {
      this.$q.notify({
        message,
        textColor: 'red',
        icon: 'warning'
      })
    },
    // 获取验证码
    async getCode() {
      const res = await this.$refs.account.validate()
      if (res) {
        this.m_sendCode({
          type: this.registryType,
          target: this.registryForm.account
        })
      }
    },
    // 提交
    async onSubmit() {
      const res = await this.$refs.registry.validate()
      if (res) {
        if (!this.checked) {
          return this.notify('请阅读并同意下方用户协议')
        }
        this.registryForm.type = this.registryType
        try {
          await registry(this.registryForm)
          this.$q.notify({
            message: '注册成功',
            textColor: 'green',
            icon: 'done'
          })
          setTimeout(() => {
            this.$router.push({ path: '/login' })
          }, 1500)
        } catch (error) {}
      }
    },
    // 用户协议
    toProtocal() {
      console.log('Protocal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/css/login-registry.scss';

.registry-type {
  margin-top: 45px;
  span {
    color: #106c8a;
    font-size: 16px;
    font-weight: bold;
    margin-right: 16px;
    &.active {
      color: #fff;
    }
  }
}
.protocol {
  color: '#999999';
  font-size: 12px;
}
</style>
