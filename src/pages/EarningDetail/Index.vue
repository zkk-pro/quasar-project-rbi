<template>
  <q-page>
    <div class="title row items-center q-px-sm">
      <q-icon name="play_arrow" size="15px" />收益明细
    </div>
    <q-list class="q-px-md" style="background: rgba(255,255,255,0.05)">
      <div v-for="item in '123'" :key="item">
        <EarningItem />
        <q-separator style="background: rgba(255,255,255,0.05)" />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import EarningItem from 'components/EarningItem'
export default {
  components: { EarningItem }
}
</script>

<style lang="scss" scoped>
.title {
  height: 40px;
  color: rgba($color: #fff, $alpha: 0.6);
}
</style>
