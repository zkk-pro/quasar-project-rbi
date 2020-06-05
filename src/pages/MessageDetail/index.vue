<template>
  <q-page class="message-detail q-pa-md">
    <div class="back" @click="toList" >&lt;&lt;返回公告列表</div>
    <!-- <router-link class="back" to="/message-list" replace >&lt;&lt;返回公告列表</router-link> -->
    <div class="title q-mt-lg q-mt-xs">{{notice.title}}</div>
    <div class="time q-mb-xs q-mt-sm">{{notice.createTime | formatDate}}</div>
    <div class="content q-mt-lg" v-html="notice.content">
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
      notice: {}
    }
  },
  methods: {
    async noticeDetail() {
      const { data } = await noticeDetail({ id: this.id })
      this.notice = data
    },
    toList() {
      console.log(this.$router)
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
