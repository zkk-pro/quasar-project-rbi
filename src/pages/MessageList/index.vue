<template>
  <q-page class="message-list">
    <div class="notice q-ml-md row items-center">
      <q-icon name="play_arrow" size="10" class="icon q-mr-xs q-pl-xs"></q-icon>
      <span>公告列表</span>
    </div>
    <q-list bordered separator>
      <q-item
        clickable
        v-ripple
        v-for="(item, index) in messageList"
        :key="index"
        @click="messageDetail"
      >
        <q-item-section>
          <q-item-label class="row items-center">
            <div class="circle q-mr-sm"></div>
            <div class="item-title">{{ item.title }}</div>
          </q-item-label>
          <q-item-label class="item-subtitle">{{ item.content }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      messageList: [
        {
          title: '我我我我我我我我我我我我我我我我我我我我我我我我我我',
          content: '33333333333333'
        },
        { title: '111111', content: '33333333333333' },
        { title: '111111', content: '33333333333333' }
      ]
    }
  },
  methods: {
    messageDetail() {
      this.$router.push({ path: 'message/message-detail' })
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
  .q-list {
    border-color: rgba(255, 255, 255, 0.1);
    .q-item {
      height: 80px;
      .item-title {
        font-size: 16px;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-subtitle {
        margin-left: 18px;
        opacity: 0.2;
        font-size: 13px;
      }
    }
    .q-item-type {
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
  }
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 1);
    opacity: 0.2;
    &.new {
      background: #00e6ff;
      opacity: 1;
    }
  }
}
</style>
