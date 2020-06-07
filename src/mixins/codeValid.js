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
          message: this.$t('notify_sendcode_success'),
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
            this.m_btnText = this.$t('notidy_send_again')
            this.m_btnDisable = false
          }
        }, 1000)
      } catch (error) {
      }
    }
  }
}
