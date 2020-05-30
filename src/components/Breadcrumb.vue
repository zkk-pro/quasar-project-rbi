<template>
  <div class="breadcrumb">
    <span v-for="(item, index) in levelList" :key="item.path">
      {{ item.meta.title }}
      <span v-if="index !== levelList.length - 1">></span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  methods: {
    getRouteTitle() {
      this.levelList = this.$route.matched.filter(item => item.meta.title)
    }
  },
  watch: {
    $route: {
      handler: function() {
        this.getRouteTitle()
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  height: 33px;
  line-height: 33px;
  font-size: 14px;
}
</style>
