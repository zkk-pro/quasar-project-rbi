<template>
  <q-page class="message-detail q-pa-md">
    <router-link class="back" replace="/message-list">&lt;&lt;返回公告列表</router-link>
    <div class="title q-mt-md">11111</div>
    <div class="time q-my-sm">1111</div>
    <div class="content q-mt-md">
      这里是公告正文：Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
      accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor.
      Sociis natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis
      tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
    </div>
  </q-page>
</template>

<script>
export default {
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
