<template>
  <q-form @submit="onSubmit">
    <q-input
      v-model="form.old"
      borderless
      :type="showPwd ? 'text' : 'password'"
      class="input-style q-px-md"
      :maxlength="type==='pin' ? '6': ''"
      :prefix="text.prefix_old"
      :placeholder="text.placeholder_old"
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
      :maxlength="type==='pin' ? '6': ''"
      :prefix="text.prefix_new"
      :placeholder="text.placeholder_new"
      :input-style="{ color: 'white' }"
    />
    <q-separator style="background: rgba(255,255,255,0.1)" />
    <q-input
      v-model="form.newAgen"
      borderless
      type="password"
      class="input-style q-px-md"
      :maxlength="type==='pin' ? '6': ''"
      :prefix="text.prefix_newAgen"
      :placeholder="text.placeholder_newAgen"
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
</template>

<script>
const textExact = {
  pin: {
    prefix_old: '原密码',
    placeholder_old: '请输入原密码',
    prefix_new: '新密码',
    placeholder_new: '请输入新密码',
    prefix_newAgen: '新密码确认',
    placeholder_newAgen: '请再次输入登录密码'
  },
  pwd: {
    prefix_old: '原密码',
    placeholder_old: '请输入原密码',
    prefix_new: '新密码',
    placeholder_new: '请输入新密码',
    prefix_newAgen: '新密码确认',
    placeholder_newAgen: '请再次输入PIN密码'
  }
}
export default {
  props: {
    type: {
      type: String,
      default: 'pin',
      validator: function(val) {
        return ['pin', 'pwd'].includes(val)
      }
    }
  },
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
  computed: {
    text() {
      return textExact[this.type]
    }
  },
  methods: {
    notify(message) {
      this.$q.notify({ message, icon: 'warning', textColor: 'red' })
    },
    onSubmit() {
      if (!this.form.old) {
        return this.notify('请输入原密码')
      } else if (!this.form.new) {
        return this.notify('请输入新密码')
      } else if (this.form.new !== this.form.newAgen) {
        return this.notify('两次新密码不一致，请重新输入')
      }
      this.$emit('ok', this.form)
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
