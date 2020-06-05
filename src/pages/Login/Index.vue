<template>
  <q-page class="q-px-lg">
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
          <router-link to="/">忘记密码</router-link>
        </q-item-section>
        <q-separator inset vertical class="bg-primary" />
        <q-item-section class="text-primary q-ml-lg">
          <router-link to="/registry">用户注册</router-link>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      pwdVisible: false,
      fromPath: '/'
    }
  },
  beforeRouteLeave(to, from, next) {
    this.fromPath = from.path
    next()
  },
  methods: {
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
