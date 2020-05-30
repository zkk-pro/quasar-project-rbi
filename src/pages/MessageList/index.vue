<template>
  <q-page class="message-list">
    <div class="notice q-ml-md row items-center">
      <q-icon name="play_arrow" size="10" class="icon q-mr-xs q-pl-xs"></q-icon>
      <span>公告列表</span>
    </div>
    <q-list separator>
      <div v-for="(item, index) in 3" :key="index">
        <q-item class="q-py-md" clickable v-ripple to="/message-detail">
          <q-item-section>
            <div class="row items-center">
              <span class="circle"></span>
              <span class="item-title">223</span>
            </div>
            <div class="q-mt-sm" style="padding-left: 22px">2020-05-25 11:20</div>
          </q-item-section>
        </q-item>
        <q-separator style="background: rgba(255, 255, 255, .1)" />
      </div>
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
  methods: {}
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
