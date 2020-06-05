<template>
  <q-page>
    <q-form @submit="onSubmit" class="form">
      <q-input
        v-model="form.old"
        borderless
        :type="showPwd ? 'text' : 'password'"
        class="input-style q-px-md"
        prefix="原密码"
        placeholder="请输入原密码"
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
        prefix="新密码"
        placeholder="请输入新密码"
        :input-style="{ color: 'white' }"
      />
      <q-separator style="background: rgba(255,255,255,0.1)" />
      <q-input
        v-model="form.newAgen"
        borderless
        type="password"
        class="input-style q-px-md"
        prefix="新密码确认"
        placeholder="请再次输入登录密码"
        :input-style="{ color: 'white' }"
      />
      <div class="row justify-center" style="margin-top: 184px">
        <q-btn
          unelevated
          rounded
          type="submit"
          color="primary"
          text-color="dark"
          label="确定"
          class="confirm-btn"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { userModify } from 'src/api/apiList'
export default {
  data() {
    return {
      showPwd: false,
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
    async onSubmit() {
      if (!this.form.old) {
        return this.notify('请输入原密码')
      } else if (!this.form.new) {
        return this.notify('请输入新密码')
      } else if (this.form.new.length < 6) {
        return this.notify('密码不能低于6位数')
      } else if (this.form.new !== this.form.newAgen) {
        return this.notify('两次新密码不一致，请重新输入')
      }
      try {
        await userModify({
          password: this.form.old,
          passwordUpdate: this.form.new
        })
        this.$q.notify({
          message: '修改成功',
          icon: 'done',
          textColor: 'green'
        })
        setTimeout(() => {
          this.$router.go(-1)
        }, 1500)
      } catch (error) {}
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
</style>
