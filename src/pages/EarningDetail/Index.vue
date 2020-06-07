<template>
  <q-page class="container">
    <div class="title row items-center q-px-sm">
      <q-icon name="play_arrow" size="15px" />{{$t('earning_detail')}}
    </div>
    <q-list class="no-data">
      <div
        v-for="item in earningList"
        :key="item.id"
        style="background: rgba(255,255,255,0.05)"
      >
        <EarningItem class="q-px-md" hover :itemData="item" />
        <q-separator style="background: rgba(255,255,255,0.05)" />
      </div>
    </q-list>
    <q-pagination
      class="q-mt-md row justify-center"
      v-model="params.paging"
      v-if="earningList.length"
      :max="pageInfo.pageMax || 1"
      :max-pages="6"
      direction-links
      @input="pageChange"
      size="12px"
    >
    </q-pagination>
  </q-page>
</template>

<script>
import EarningItem from 'components/EarningItem'
import { getAssets } from 'src/api/apiList'
export default {
  data() {
    return {
      params: {
        paging: 1,
        limit: 5,
        skey: 'INTEREST'
      },
      earningList: [],
      pageInfo: {}
    }
  },
  computed: {
    currentPage() {
      return this.params.paging + 1
    }
  },
  components: { EarningItem },
  methods: {
    // 页码改变
    pageChange(value) {
      this.getAssets()
    },
    async getAssets() {
      const { data } = await getAssets(this.params)
      this.earningList = data.list
      this.pageInfo = data.pagination
    }
  },
  created() {
    this.getAssets()
  }
}
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
  color: rgba($color: #fff, $alpha: 0.6);
}
// .no-data:empty::before {
//   content: '— 暂无收益 —';
//   display: block;
//   line-height: 30px;
//   font-size: 12px;
//   color: #ccc;
//   text-align: center;
// }
</style>
