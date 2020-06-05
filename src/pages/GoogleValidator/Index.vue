<template>
  <q-page class="q-px-md q-py-md column">
    <p class="one-icon">
      在应用商店中搜索“Google Authenticator”应用并下载
    </p>
    <p class="two-icon">
      打开谷歌验证器，填入您的RBI账号，并扫描下方二维码或手动输入下方密钥。
    </p>
    <div class="column items-center">
      <img class="qr-code" :src="googleAuth.secretQrCode" alt="" />
      <div class="q-mt-md row text-primary">
        {{ googleAuth.secret }}<i class="copy-icon" @click="copy"></i>
      </div>
    </div>
    <p class="q-mt-md">
      密钥用于手机更换或遗失找回谷歌验证器，绑定前请务必将密钥备份保存。
    </p>
    <p class="q-mt-md three-icon">输入谷歌验证器中6位验证码</p>
    <div style="padding-left: 18px">
      <q-form @submit="onSubmit" ref="bindForm">
        <q-input
          v-model="form.googleCode"
          filled
          dense
          :prefix="`${isBind ? '新': ''}谷歌验证码`"
          maxlength="6"
          :input-style="{ color: 'white' }"
          placeholder="请输入验证码"
          lazy-rules
          no-error-icon
          :rules="[val => (!!val && !(val.length < 6)) || '请输入6位数验证码']"
        />
        <q-input
          v-model="form.code"
          filled
          dense
          :prefix="`${userTypeText}验证码`"
          maxlength="6"
          :input-style="{ color: 'white' }"
          placeholder="请输入验证码"
          lazy-rules
          no-error-icon
          :rules="[val => (!!val && !(val.length < 6)) || '请输入6位数验证码']"
        >
          <template v-solot:prepend>
            <div class="getcode-btn row">
              <q-btn
                flat
                stack
                :disable="codeBtnDisabled"
                color="primary"
                :label="codeBtnLabel"
                style="min-width: 70px"
                @click="getCode"
              />
            </div>
          </template>
        </q-input>
        <q-btn
          rounded
          type="submit"
          color="primary"
          text-color="dark"
          class="confrim-btn"
          label="确认开启"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { getGoogleAuth, bindGoogle, validate } from 'src/api/apiList'
export default {
  data() {
    return {
      address: 'N5U3F7JEMRXJPTX7',
      isEmail: true, // 是否邮箱验证
      googleAuth: {}, // google私钥信息
      userType: '', // 用户注册类型
      isBind: false, // 是否绑定
      codeBtnDisabled: false, // 发送验证按钮禁用
      codeBtnLabel: '获取验证码', // 获取验证码按钮文字
      timer: null,
      form: {
        googleCode: '',
        code: '' // 邮箱、短信验证码
      }
    }
  },
  computed: {
    userTypeText() {
      if (this.userType === 'mobile') {
        return '手机'
      } else {
        return '邮箱'
      }
    }
  },
  methods: {
    // 复制
    async copy() {
      try {
        await this.$copyText(this.googleAuth.secret)
        this.$q.notify({
          message: '复制成功',
          icon: 'done',
          textColor: 'green'
        })
      } catch (error) {
        this.$q.notify({
          message: '复制失败，请刷新网页重试',
          icon: 'warning',
          textColor: 'red'
        })
      }
    },
    // 获取验证码
    async getCode() {
      try {
        await validate({ type: this.userType })
        let time = 60
        this.codeBtnDisabled = true
        time--
        this.codeBtnLabel = time + 's'
        this.timer = setInterval(() => {
          time--
          this.codeBtnLabel = time + 's'
          if (time < 0) {
            clearInterval(this.timer)
            this.codeBtnLabel = '重新获取'
            this.codeBtnDisabled = false
          }
        }, 1000)
      } catch (error) {
        this.codeBtnDisabled = false
      }
    },
    // 确认开启
    async onSubmit() {
      const res = this.$refs.bindForm.validate()
      if (res) {
        try {
          await bindGoogle({
            code: this.form.googleCode,
            captcha: this.form.code
          })
          this.$router.replace({
            name: 'success',
            params: { text: '谷歌验证器开启成功' }
          })
        } catch (error) {}
      }
    },
    // 获取google私钥
    async getGoogleAuth() {
      const { data } = await getGoogleAuth()
      this.googleAuth = data
    },
    async bindGoogle() {
      await bindGoogle()
    }
  },
  created() {
    this.getGoogleAuth()
    this.userType = this.$store.getters.userinfo.type
    this.isBind = this.$store.getters.userinfo.securityGoogleIsBind
  }
}
</script>

<style lang="scss" scoped>
// 组件样式覆盖
/deep/ .q-field__prefix {
  color: white;
}
/deep/ .q-placeholder::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.getcode-btn /deep/ .q-btn__wrapper {
  padding: 0;
}
/deep/ .q-field__inner {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}
// END

p {
  line-height: 22px;
}
.qr-code {
  width: 180px;
  height: 180px;
}
.copy-icon {
  margin-left: 10px;
  &::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(~assets/images/copy-icon.png);
    background-size: 100% 100%;
  }
}
.confrim-btn {
  width: 315px;
  height: 46px;
  align-self: center;
  margin-top: 70px;
}
</style>
