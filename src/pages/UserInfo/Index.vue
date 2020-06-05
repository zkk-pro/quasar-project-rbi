<template>
  <q-page>
    <q-list v-if="Object.keys(userinfo).length">
      <q-item style="background: rgba(255,255,255, 0.05)">
        <q-item-section>UID</q-item-section>
        <q-item-section align="right">{{ userinfo.id }}</q-item-section>
      </q-item>
      <q-separator inset dark style="background: rgba(255,255,255,0.1)" />
      <q-item style="background: rgba(255,255,255, 0.05)">
        <q-item-section>
          {{ userinfo.type === 'email' ? '邮箱号' : '手机号' }}
        </q-item-section>
        <q-item-section align="right">{{ userinfo.mobile }}</q-item-section>
      </q-item>
      <!-- <q-item style="background: rgba(255,255,255, 0.05)" v-else>
        <q-item-section>手机号</q-item-section>
        <q-item-section align="right">137***2917</q-item-section>
      </q-item> -->
      <q-item class="q-mt-sm" style="background: rgba(255,255,255, 0.05)">
        <q-item-section>谷歌身份验证</q-item-section>
        <q-item-section align="right">
          <!-- v-model="userinfo.securityGoogleSwitch" -->
          <q-toggle
            :value="userinfo.securityGoogleSwitch"
            @input="googleModelHandle"
            :false-value="0"
            :true-value="1"
          />
        </q-item-section>
      </q-item>
      <q-separator inset dark style="background: rgba(255,255,255,0.1)" />
      <q-item style="background: rgba(255,255,255, 0.05)">
        <q-item-section>谷歌验证器</q-item-section>
        <q-item-section align="right">
          <span
            class="right-arrow"
            v-if="userinfo.securityGoogleIsBind"
            @click="resetGoogle"
            >重置</span
          >
          <router-link
            class="text-primary right-arrow"
            to="/f-g-validator"
            v-else
          >
            去绑定
          </router-link>
        </q-item-section>
      </q-item>
      <q-item class="q-mt-sm" style="background: rgba(255,255,255, 0.05)">
        <q-item-section>登录密码</q-item-section>
        <q-item-section align="right">
          <router-link class="right-arrow" to="/modify-pwd">修改</router-link>
        </q-item-section>
      </q-item>
      <q-separator inset dark style="background: rgba(255,255,255,0.1)" />
      <q-item style="background: rgba(255,255,255, 0.05)">
        <q-item-section>PIN码</q-item-section>
        <q-item-section align="right">
          <div
            class="right-arrow"
            to="/modify-pin"
            v-if="userinfo.securityIsBind"
            @click="modifyPIN"
          >
            修改
          </div>
          <div class="text-primary right-arrow" to="/change-pwd" v-else>
            去设置
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <Dialog
      ref="googleValidatorDialog"
      title="重置谷歌验证"
      @confirm="googleValidatorConfirm"
    >
      <span class="q-pl-lg" style="font-size: 13px; color:#666">
        谷歌验证器重置后，24小时内无法提币
      </span>
    </Dialog>
    <!-- 开启Google身份验证时的 安全验证 -->
    <Dialog
      ref="openGoogleValidatorDialog"
      title="安全验证"
      confirmHold
      @confirm="openGoogleValidatorConfirm"
      @cancel="openGoogleValidatorCancel"
    >
      <q-form ref="googleValidatorSafeForm" class="q-px-md">
        <q-input
          v-model="openGoogleValidatorForm.googleCode"
          class="full-width"
          dense
          maxlength="6"
          label="谷歌验证码"
          lazy-rules
          :rules="[
            val => !!val || '请输入验证码',
            val => !(val.length < 6) || '请输入6数位验证码'
          ]"
        />
        <q-input
          v-model="openGoogleValidatorForm.code"
          class="full-width"
          dense
          maxlength="6"
          label="手机验证码"
          lazy-rules
          :rules="[
            val => !!val || '请输入验证码',
            val => !(val.length < 6) || '请输入6数位验证码'
          ]"
        >
          <template v-slot:append>
            <q-btn flat style="color:#118EE9; font-size:14px" @click="getCode"
              >获取验证码</q-btn
            >
          </template>
        </q-input>
      </q-form>
    </Dialog>
    <SetPIN
      :show="setPINShow"
      @success="onSetPINSuccess"
      @cancel="setPINShow = false"
    />
  </q-page>
</template>

<script>
import Dialog from 'components/Dialog'
import SetPIN from 'components/SetPIN'

export default {
  data() {
    return {
      // googleModel: false, // google验证身份验证开关
      openGoogleValidatorForm: {
        googleCode: '',
        code: ''
      },
      userinfo: {}, // 用户信息
      setPINShow: false // 显示修改PIN弹框
    }
  },
  components: { Dialog, SetPIN },
  methods: {
    // google验证身份验证事件
    googleModelHandle(val) {
      // 判断是否绑定
      if (this.userinfo.securityGoogleIsBind) {
        this.$refs.openGoogleValidatorDialog.open()
      } else {
        this.$router.push({ path: 'f-g-validator' })
      }
    },
    // 打开安全验证 确认事件
    async openGoogleValidatorConfirm() {
      const res = await this.$refs.googleValidatorSafeForm.validate()
      console.log('res', res)
      if (res) {
        this.$refs.openGoogleValidatorDialog.close()
      }
    },
    // 取消安全验证
    openGoogleValidatorCancel() {
      this.openGoogleValidatorForm.googleCode = ''
      this.openGoogleValidatorForm.code = ''
      this.googleModel = false
    },
    // 获取验证码
    getCode() {
      console.log(123)
    },
    // 重置google 验证器
    resetGoogle() {
      this.$refs.googleValidatorDialog.open()
    },
    // 重置google 验证器 dialog confirm
    googleValidatorConfirm() {
      this.$router.push({ path: 'g-validator' })
    },
    // 修改、设置PIN
    modifyPIN() {
      this.setPINShow = true
    },
    // 修改、设置PIN 成功
    onSetPINSuccess() {
      if (this.userinfo.securityIsBind === 0) {
        this.userinfo.securityIsBind = 1
      }
    },
    // 获取用户信息
    async getUserINfo() {
      const { data } = await this.$store.dispatch('UpdateUserInfo')
      this.userinfo = Object.assign({}, data)
    }
  },
  created() {
    this.getUserINfo()
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  background: #181837;
}
.right-arrow {
  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 14px;
    background: url('~assets/images/arrow-right.png');
    background-size: 100% 100%;
    vertical-align: top;
    margin-left: 10px;
  }
}
</style>
