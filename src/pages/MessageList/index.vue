<template>
  <q-page class="message-list column items-center">
    <div class="notice q-ml-md row items-center text-left">
      <q-icon name="play_arrow" size="10" class="icon q-mr-xs q-pl-xs"></q-icon>
      <span>公告列表</span>
    </div>
    <q-list separator>
      <div v-for="(item, index) in messageList" :key="index">
        <q-item
          class="q-py-md"
          clickable
          v-ripple
          :to="{ path: 'message-detail', query: { id: item.id } }"
        >
          <q-item-section>
            <div class="row items-center">
              <span :class="['circle', item.readTime > 0 ? '' : 'new']"></span>
              <div class="item-title ellipsis">{{ item.title }}</div>
            </div>
            <div class="q-mt-sm item-time" style="">
              {{ item.createTime | formatDate }}
            </div>
          </q-item-section>
        </q-item>
        <q-separator style="background: rgba(255, 255, 255, .1)" />
      </div>
    </q-list>
    <div
      class="q-pa-lg flex flex-center justify-center paging-wrapper"
    >
      <q-pagination
        class="q-mt-md row justify-center"
        v-model="paging"
        v-if="messageList.length"
        :max="pagination.pageMax || 1"
        :max-pages="6"
        :boundary-numbers="true"
        :direction-links="true"
        @input="pageChange"
        size="12px"
      >
      </q-pagination>
      <!-- <div class="paging-input q-ml-lg row items-center">
        到第
        <q-input v-model="page" type="number" class="q-mx-md page-input" />
        确定
      </div> -->
    </div>
  </q-page>
</template>

<script>
import { noticeList } from 'src/api/apiList'
import { date } from 'quasar'
export default {
  data() {
    return {
      messageList: [],
      paging: 1,
      current: 0,
      pagination: {}
    }
  },
  methods: {
    pageChange(value) {
      console.log(value)
      this.getMessageList()
    },
    async getMessageList() {
      const { data } = await noticeList({ paging: this.paging, limit: 10 })
      this.messageList = data.list
      this.pagination = data.pagination
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
/deep/.q-list {
  background: rgba(26, 26, 60, 1);
}
/deep/.q-field--standard .q-field__control:before {
  border-bottom: 0;
}
/deep/.q-field__control {
  height: 20px;
}
/deep/.q-field__native {
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
}
.item-title{
  width: 263px;
}
.page-input {
  width: 20px;
  height: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
}
.paging-wrapper {
  height: 154px;
}

.screen--xs .q-list, .notice {
  width: 100%;
}
.notice{
  height: 40px;
}
.item-time {
  padding-left: 22px;
  color: #999;
}
.screen--sm .item-time {
  margin-top: 0;
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
@media screen and (min-width: 599px) {
  .q-list, .notice {
  width: 90%;
  max-width: 1200px;
}
  .q-item__section--main {
    flex-direction: row;
    justify-content: space-between;
  }
  .item-time{
    margin-top: 0;
  }
  .message-list {
    .notice {
      height: 76px;
      .icon {
        opacity: 0.6;
      }
    }
  }
}
</style>
