<template>
  <q-page class="column items-center">
    <q-form @submit="onSubmit" class="form">
      <q-input
        v-model="form.old"
        borderless
        :type="showPwd ? 'text' : 'password'"
        class="input-style q-px-md"
        maxlength="6"
        :prefix="$t('modify_pin_origin')"
        :placeholder="$t('modify_six_digit_pin')"
        :input-style="{ color: 'white' }"
      >
        <template v-slot:append>
          <div
            :class="showPwd ? 'visible-pwd' : 'invisible-pwd'"
            @click="showPwd = !showPwd"
          ></div>
        </template>
      </q-input>
      <q-separator style="background: rgba(255,255,255,0.1)" />
      <q-input
        v-model="form.new"
        borderless
        type="password"
        class="input-style q-px-md"
        maxlength="6"
        :prefix="$t('modify_pin_new')"
        :placeholder="$t('modify_pinnew')"
        :input-style="{ color: 'white' }"
      />
      <q-separator style="background: rgba(255,255,255,0.1)" />
      <q-input
        v-model="form.newAgen"
        borderless
        type="password"
        class="input-style q-px-md"
        maxlength="6"
        :prefix="$t('modify_newpin_confirm')"
        :placeholder="$t('modify_pinnew_again')"
        :input-style="{ color: 'white' }"
      />
      <q-separator style="background: rgba(255,255,255,0.1)" />
      <div class="row justify-center" style="margin-top: 184px">
        <q-btn
          unelevated
          rounded
          no-caps
          type="submit"
          color="primary"
          text-color="dark"
          :label="$t('modify_confirm')"
          class="confirm-btn"
        />
      </div>
    </q-form>
    <SafeValidate
      :show.sync="safeShow"
      :validType="validType"
      @safeConfirm="onSafeConfirm"
    />
  </q-page>
</template>

<script>
import { userModify } from 'src/api/apiList'
export default {
  data() {
    return {
      showPwd: false,
      safeShow: false, // 显示安全验证
      validType: 1, // 验证类型
      form: {
        old: '',
        new: '',
        newAgen: ''
      }
    }
  },
  methods: {
    notify(message) {
      this.$q.notify({ message, icon: 'warning', textColor: 'red' })
    },
    onSubmit() {
      console.log(this.form.new)
      if (!this.form.old) {
        return this.notify(this.$t('modify_pinorigin'))
      } else if (!this.form.new) {
        return this.notify(this.$t('modify_pinnew'))
      } else if (this.form.new.length < 6) {
        return this.notify(this.$t('modify_lessthan_six'))
      } else if (this.form.new !== this.form.newAgen) {
        return this.notify(this.$t('modify_same'))
      }
      this.safeShow = true
    },
    async onSafeConfirm(code) {
      try {
        await userModify({
          code,
          pinCode: this.$MD5(this.form.old).toString(),
          pinCodeUpdate: this.$MD5(this.form.new).toString()
          // pinCode: this.form.old,
          // pinCodeUpdate: this.form.new
        })
        this.$q.notify({
          message: this.$t('com_modify_success'),
          icon: 'done',
          textColor: 'green'
        })
        this.safeShow = false
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      } catch (error) {}
    }
  },
  created() {
    this.validType = this.$store.getters.userinfo.securityLevel
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
/deep/ .q-form {
  width: 100%;
}
.getcode-btn /deep/ .q-btn__wrapper {
  padding: 0;
}
// END

.q-page {
  background: rgba(24, 24, 55, 1);
}
.input-style {
  background: rgba(255, 255, 255, 0.05);
}
.visible-common {
  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 10px;
  }
}
.invisible-pwd {
  &::before {
    @extend .visible-common;
    background: url('~assets/images/modify-pwd-invisible.png');
    background-size: 100% 100%;
  }
}
.visible-pwd {
  &::before {
    @extend .visible-common;
    background: url('~assets/images/modify-pwd-visible.png');
    background-size: 100% 100%;
  }
}
.confirm-btn {
  width: 315px;
  height: 46px;
  font-size: 16px;
  font-weight: bold;
}
@media screen and (min-width: 599px) {
  /deep/ .q-form {
    width: 440px;
    padding: 40px;
    margin-top: 40px;
    background: rgba(255, 255, 255, 0.05);
  }
  .input-style {
    background: transparent;
  }
}
</style>
