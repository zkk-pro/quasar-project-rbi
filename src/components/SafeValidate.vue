<template>
  <q-dialog v-model="show" persistent @hide="onDialogHide">
    <q-card style="min-width: 335px">
      <q-card-section class="q-pb-none">
        <div style="font-size:16px; color:#333">安全验证</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pb-none" style="margin: 50px 0">
        <q-input
          :label="typeData.label"
          color="blue-5"
          label-color="dark"
          dense
          v-model="code"
        >
          <template v-if="typeData.btnText" v-slot:append>
            <q-btn :label="typeData.btnText" unelevated text-color="blue-5" @click="getCode" />
          </template>
        </q-input>
        <div class="tips-text">
          {{ typeData.tipsText }}
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pt-none">
        <div style="height:36px">
          <q-btn
            label="取消"
            color="blue-grey-8"
            text-color="blue-grey-8"
            outline
            v-close-popup
            style="margin-right: 20px"
          />
          <q-btn
            unelevated
            label="确定"
            color="primary"
            text-color="blue-grey-8"
            :disable="btn_disabled"
            @click="confirm"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'SafeValidate',
  props: {
    // 验证类型：google、phone、email
    validType: {
      type: String,
      required: true,
      validator: function(value) {
        return ['google', 'phone', 'email'].includes(value)
      }
    }
  },
  data() {
    return {
      show: false,
      code: ''
    }
  },
  computed: {
    typeData() {
      let data = {}
      switch (this.validType) {
        case 'google':
          data = {
            label: '谷歌验证码',
            tipsText: ''
          }
          break
        case 'phone':
          data = {
            label: '短信验证码',
            btnText: '发送验证码',
            tipsText: '输入您的号码137****2917收到的验证码'
          }
          break
        case 'email':
          data = {
            label: '邮箱验证码',
            btnText: '发送验证码',
            tipsText: '输入您的邮箱 11*****@qq.com 收到的验证码'
          }
          break
      }
      return data
    },
    // 禁用确认按钮控制
    btn_disabled() {
      return !this.code.length
    }
  },
  methods: {
    // 显示弹框
    open() {
      this.show = true
    },
    // 确认按钮
    confirm() {
      console.log(this.code)
    },
    // 弹框隐藏事件
    onDialogHide() {
      this.code = ''
    },
    getCode() {
      console.log(this.validType)
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-text {
  color: #666;
  margin-top: 10px;
  font-size: 13px;
  height: 13px;
}
</style>
