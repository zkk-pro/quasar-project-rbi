<template>
  <q-page class="message-detail q-pa-md column items-center">
    <div class="back text-left" @click="toList">&lt;&lt;返回公告列表</div>
    <div class="message-box q-mt-lg">
      <div class="title">{{ notice.title }}</div>
      <div class="time q-mb-xs q-mt-sm">
        {{ notice.createTime | formatDate }}
      </div>
      <div class="content q-mt-lg" v-html="notice.content"></div>
    </div>
  </q-page>
</template>

<script>
import { noticeDetail } from 'src/api/apiList'
import { date } from 'quasar'
export default {
  data() {
    return {
      id: 0,
      notice: {},
      fromPath: '/'
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.fromPath = from.path
    })
  },
  methods: {
    async noticeDetail() {
      const { data } = await noticeDetail({ id: this.id })
      this.notice = data
    },
    toList() {
      if (this.fromPath === '/') {
        this.$router.replace({ path: '/message-list' })
      } else {
        this.$router.go(-1)
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.noticeDetail()
  },
  filters: {
    formatDate(d) {
      return date.formatDate(d, 'YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.message-box{
  height: 80%;
  overflow-y: auto;
  background: rgba(26,26,60,1);
  padding:40px;
  box-sizing: border-box;
}
.message-box, .back {
  width: 90%;
  max-width: 1200px;
}
@media screen and (max-width: 599px) {
  .message-box{
    width: auto;
  }
}
.message-detail {
  .back {
    opacity: 0.6;
    text-decoration: underline;
  }
  .title {
    font-size: 15px;
  }
  .time {
    font-size: 12px;
    opacity: 0.2;
  }
  .content {
    font-size: 14px;
    line-height: 22px;
    img {
      max-width: 100%;
    }
  }
}
</style>
