<template>
  <q-page class="q-px-md q-py-md column column items-center">
    <div class="validator-wrapper row justify-center">
      <div class="validator-list">
        <p class="one-icon">
          {{ $t('googel_step1') }}
        </p>
        <p class="two-icon">
          {{ $t('googel_step2') }}
        </p>
        <div class="column items-center">
          <img class="qr-code" :src="googleAuth.secretQrCode" alt="" />
          <div class="q-mt-md row text-primary">
            {{ googleAuth.secret }}<i class="copy-icon" @click="copy"></i>
          </div>
        </div>
        <p class="q-mt-md">
          {{ $t('googel_tips') }}
        </p>
        <p class="q-mt-md three-icon">{{ $t('googel_step3') }}</p>
        <div style="padding-left: 18px">
          <q-form @submit="onSubmit" ref="bindForm" class="column">
            <q-input
              v-model="form.googleCode"
              filled
              dense
              :prefix="
                `${isBind ? $t('googel_new') : ''}${$t('com_google_code')}`
              "
              maxlength="6"
              :input-style="{ color: 'white' }"
              :placeholder="$t('com_enter_captcha')"
              lazy-rules
              no-error-icon
              :rules="[
                val =>
                  (!!val && !(val.length < 6)) || $t('com_enter_captcha_six')
              ]"
            />
            <q-input
              v-model="form.code"
              filled
              dense
              :prefix="`${userTypeText}${$t('com_captcha')}`"
              maxlength="6"
              :input-style="{ color: 'white' }"
              :placeholder="$t('com_enter_captcha')"
              lazy-rules
              no-error-icon
              :rules="[
                val =>
                  (!!val && !(val.length < 6)) || $t('com_enter_captcha_six')
              ]"
            >
              <template v-solot:prepend>
                <div class="getcode-btn row">
                  <q-btn
                    flat
                    stack
                    no-caps
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
              no-caps
              text-color="dark"
              class="confrim-btn"
              :label="
                `${$t('com_confirm')}${
                  isBind ? $t('com_reset') : $t('com_open')
                }`
              "
            />
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { getGoogleAuth, bindGoogle, validate } from 'src/api/apiList'
export default {
  data() {
    return {
      isEmail: true, // 是否邮箱验证
      googleAuth: {}, // google私钥信息
      userType: '', // 用户注册类型
      isBind: false, // 是否绑定
      codeBtnDisabled: false, // 发送验证按钮禁用
      codeBtnLabel: '', // 获取验证码按钮文字
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
        return this.$t('com_phone')
      } else {
        return this.$t('com_mailbox')
      }
    }
  },
  methods: {
    // 复制
    async copy() {
      try {
        await this.$copyText(this.googleAuth.secret)
        this.$q.notify({
          message: this.$t('googel_copy_success'),
          icon: 'done',
          textColor: 'green'
        })
      } catch (error) {
        this.$q.notify({
          message: this.$t('googel_copy_fail'),
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
            this.codeBtnLabel = this.$t('googel_resend')
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
            params: { text: this.isBind ? this.$t('googel_googel_reset_success') : this.$t('googel_googel_open_success') }
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
    this.codeBtnLabel = this.$t('com_get_code')
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
/deep/ .q-field__native {
  flex: 1;
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
.validator-wrapper {
  width: 100%;
}
@media screen and (min-width: 599px) {
  .validator-wrapper {
    width: 90%;
    max-width: 1200px;
    padding: 40px 20px;
    margin-top: 40px;
    background: rgba(26, 26, 60, 1);
  }
}
</style>
