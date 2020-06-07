<template>
  <q-page class="message-detail q-pa-md column items-center">
    <div class="message-box q-mt-lg">
      <h5 class="q-my-none text-center">{{ article.title }}</h5>
      <div class="content q-mt-lg" v-html="article.content"></div>
    </div>
  </q-page>
</template>

<script>
import { getArticle } from 'src/api/apiList'
export default {
  data() {
    return {
      article: {}
    }
  },
  methods: {
    async getArticle() {
      const { data } = await getArticle({ skey: 'agreement' })
      this.article = data.list[0]
    }
  },
  created() {
    this.getArticle()
  }
}
</script>

<style lang="scss" scoped>
.screen--xs {
  .message-box {
    padding: 0;
    background: transparent;
    width: 100%;
  }
}
.message-box {
  width: 80%;
  max-width: 1200px;
  height: 80%;
  overflow-y: auto;
  background: rgba(26, 26, 60, 1);
  padding: 40px;
  box-sizing: border-box;
}
</style>
