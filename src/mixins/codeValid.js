import { sendCode } from 'src/api/apiList'
export default {
  data() {
    return {
      m_btnText: '获取验证码',
      m_btnDisable: false, // 按钮禁用
      timer: null
    }
  },
  methods: {
    async m_sendCode(params) {
      try {
        await sendCode(params)
        this.$q.notify({
          message: '验证码发送成功',
          textColor: 'green',
          icon: 'done'
        })
        let time = 60
        this.m_btnText = time + 's'
        this.m_btnDisable = true
        this.timer = setInterval(() => {
          this.m_btnText = time + 's'
          time--
          if (time < 0) {
            clearInterval(this.timer)
            this.m_btnText = '重新获取'
            this.m_btnDisable = false
          }
        }, 1000)
      } catch (error) {
        // this.$q.notify({
        //   message: '验证码发送失败，请重试',
        //   textColor: 'red',
        //   icon: 'warning'
        // })
      }
    }
  }
}
