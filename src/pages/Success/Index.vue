<template>
  <q-page class="column items-center">
    <div class="success-icon">
      <img src="~assets/images/lock-success.png" alt="" />
    </div>
    <div class="q-mt-md q-mb-sm" style="font-size:17px; font-weight:bold;">
      {{ info.text }}
    </div>
    <div class="text-primary" style="height:14px">
      <span v-if="info.date && $i18n.locale == 'en-us'"
        >Expected to start calculating revenue in
        {{ info.date | formatDate }}</span
      >
      <span v-if="info.date && $i18n.locale == 'zh-cn'"
        >预计{{ info.date | formatDate }}开始计算收益</span
      >
    </div>
    <q-btn
      rounded
      :label="$t('com_finish')"
      color="primary"
      text-color="dark"
      style="width:315px; height:46px; font-size:16px; margin-top:80px"
      @click="$router.replace(info.path)"
    />
  </q-page>
</template>

<script>
import { date } from 'quasar'
export default {
  data() {
    return {
      info: {}
    }
  },
  filters: {
    formatDate(d) {
      return date.formatDate(d, 'YYYY-MM-DD')
    }
  },
  created() {
    if (!Object.keys(this.$route.params).length) {
      return this.$router.replace({ path: '/' })
    }
    this.info = this.$route.params
    this.$store.dispatch('UpdateUserInfo')
  }
}
</script>

<style lang="scss" scoped>
.q-page {
  background: #181837;
}
.success-icon {
  width: 80px;
  height: 80px;
  margin-top: 95px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
