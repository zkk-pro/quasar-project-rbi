<template>
  <q-dialog v-model="show" persistent @hide="onDialogHide">
    <q-card class="dialog-card column justify-between">
      <q-card-section class="q-pb-none">
        <div style="font-size:16px; color:#333">安全验证</div>
      </q-card-section>

      <q-card-section class="q-px-lg q-py-none">
        <q-input
          :label="typeData.label"
          color="blue-5"
          label-color="dark"
          dense
          maxlength="6"
          v-model="code"
        >
          <template v-if="typeData.shwoCodeBtn" v-slot:append>
            <q-btn
              style="width: 80px"
              flat
              dense
              :disable="codeBtnDisabled"
              color="blue-5"
              :label="codeBtnText"
              @click="getCode"
            />
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
            @click="$emit('update:show', false)"
            style="margin-right: 20px"
          />
          <q-btn
            unelevated
            label="确定"
            color="primary"
            text-color="blue-grey-8"
            :disable="btn_disabled"
            @click="$emit('safeConfirm', code)"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { validate, sendCode } from 'src/api/apiList'

const GOOGLE = 1
const PHONE = 2
const EMAIL = 3
export default {
  name: 'SafeValidate',
  props: {
    show: Boolean,
    // 验证类型：1:google、2:phone、3:email
    validType: {
      type: Number,
      required: true,
      validator: function(value) {
        return [GOOGLE, PHONE, EMAIL].includes(value)
      }
    }
  },
  data() {
    return {
      // show: false,
      code: '',
      codeBtnText: '发送验证码',
      codeBtnDisabled: false,
      timer: null
    }
  },
  computed: {
    typeData() {
      let data = {}
      switch (this.validType) {
        case GOOGLE:
          data = {
            label: '谷歌验证码',
            shwoCodeBtn: false,
            tipsText: ''
          }
          break
        case PHONE:
          data = {
            label: '短信验证码',
            shwoCodeBtn: true,
            tipsText: `输入您的号码${this.$store.getters.userinfo.mobile}收到的验证码`
          }
          break
        case EMAIL:
          data = {
            label: '邮箱验证码',
            shwoCodeBtn: true,
            tipsText: `输入您的邮箱${this.$store.getters.userinfo.mobile}收到的验证码`
          }
          break
      }
      return data
    },
    // 禁用确认按钮控制
    btn_disabled() {
      return !this.code.length || this.code.length !== 6
    }
  },
  methods: {
    // 弹框隐藏事件
    onDialogHide() {
      this.code = ''
    },
    async getCode() {
      try {
        this.codeBtnDisabled = true
        if (this.$store.getters.token) {
          await validate()
        } else {
          await sendCode({
            type: this.$store.getters.userinfo.type,
            target: this.$store.getters.userinfo.account
          })
        }
        let time = 60
        this.codeBtnText = time + 's'
        time--
        this.timer = setInterval(() => {
          time--
          this.codeBtnText = time + 's'
          if (time < 0) {
            clearInterval(this.timer)
            this.codeBtnText = '重新发送'
            this.codeBtnDisabled = false
          }
        }, 1000)
      } catch (error) {
        this.codeBtnDisabled = false
      }
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
