<template>
  <q-page class="q-px-md q-py-md column">
    <p class="one-icon">
      在应用商店中搜索“Google Authenticator”应用并下载
    </p>
    <p class="two-icon">
      打开谷歌验证器，填入您的RBI账号，并扫描下方二维码或手动输入下方密钥。
    </p>
    <div class="column items-center">
      <img class="qr-code" src="" alt="image-load-faild" />
      <div class="q-mt-md row text-primary">
        N5U3F7JEMRXJPTX7<i class="copy-icon" @click="copy"></i>
      </div>
    </div>
    <p class="q-mt-md">
      密钥用于手机更换或遗失找回谷歌验证器，绑定前请务必将密钥备份保存。
    </p>
    <p class="q-mt-md three-icon">输入谷歌验证器中6位验证码</p>
    <div style="padding-left: 18px">
      <q-input
        v-model="form.googleCode"
        filled
        dense
        prefix="谷歌验证码"
        maxlength="6"
        :input-style="{ color: 'white' }"
        style="background: rgba(255,255,255,0.2); border-radius: 3px"
        placeholder="请输入验证码"
      />
      <q-input
        v-model="form.code"
        filled
        dense
        class="q-mt-md"
        :prefix="isEmail ? '邮箱验证码' : '短信验证码'"
        maxlength="6"
        :input-style="{ color: 'white' }"
        style="background: rgba(255,255,255,0.2); border-radius: 3px"
        placeholder="请输入验证码"
      >
        <template v-solot:prepend>
          <div class="getcode-btn row">
            <q-btn
              flat
              stack
              color="primary"
              label="获取验证码"
              style="min-width: 70px"
              @click="getCode"
            />
          </div>
        </template>
      </q-input>
    </div>
    <q-btn
      rounded
      color="primary"
      text-color="dark"
      class="confrim-btn"
      label="确认开启"
      @click="confirmOpen"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      address: 'N5U3F7JEMRXJPTX7',
      isEmail: true, // 是否邮箱验证
      form: {
        googleCode: '',
        code: '' // 邮箱、短信验证码
      }
    }
  },
  methods: {
    // 复制
    async copy() {
      try {
        await this.$copyText(this.address)
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
    getCode() {
      console.log(123)
    },
    // 确认开启
    confirmOpen() {
      if (!this.form.googleCode) {
        return this.$q.notify({ message: '请输入谷歌验证码' })
      } else if (!this.form.code) {
        return this.$q.notify({
          message: `请输入${this.isEmail ? '邮箱' : '短信'}验证码`
        })
      }
      this.$router.push({
        name: 'success',
        params: { text: '谷歌验证器开启成功' }
      })
    }
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
  margin-top: 90px;
}
</style>
