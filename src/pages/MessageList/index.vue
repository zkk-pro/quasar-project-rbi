<template>
  <q-page class="message-list">
    <div class="notice q-ml-md row items-center">
      <q-icon name="play_arrow" size="10" class="icon q-mr-xs q-pl-xs"></q-icon>
      <span>公告列表</span>
    </div>
    <q-list separator>
      <div v-for="(item, index) in messageList" :key="index">
        <q-item class="q-py-md" clickable v-ripple :to="{ path: 'message-detail', query: {id: item.id }}">
          <q-item-section>
            <div class="row items-center">
              <span :class="['circle',item.readTime > 0 ? '': 'new']"></span>
              <span class="item-title">{{item.title}}</span>
            </div>
            <div class="q-mt-sm" style="padding-left: 22px; color: #999">
              {{item.createTime | formatDate}}
            </div>
          </q-item-section>
        </q-item>
        <q-separator style="background: rgba(255, 255, 255, .1)" />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { noticeList } from 'src/api/apiList'
import { date } from 'quasar'
export default {
  data() {
    return {
      messageList: [],
      paging: 0
    }
  },
  methods: {
    async getMessageList() {
      const { data } = await noticeList({ paging: this.paging, limit: 3 })
      this.messageList = data
    }
  },
  mounted() {
    this.getMessageList()
  },
  filters: {
    formatDate(d) {
      return date.formatDate(d, 'YYYY-MM-DD HH:mm')
    }
  }
}
</script>

<style lang="scss" scoped>
.message-list {
  .notice {
    height: 40px;
    .icon {
      opacity: 0.6;
    }
  }
}
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 1);
  opacity: 0.2;
  margin-right: 12px;
  &.new {
    background: #00e6ff;
    opacity: 1;
  }
}
</style>
