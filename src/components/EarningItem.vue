<template>
  <q-item clickable class="q-py-md q-px-none row full-width">
    <q-item-section>
      <div>{{ itemData.title }}</div>
      <div class="q-mt-md text-grey-8" style="font-size: 11px">
        {{itemData.createTime | dateFormat}}
      </div>
    </q-item-section>
    <q-item-section style="text-align: right">
      <!-- + #14BE7D  - #FC4A1A -->
      <span
        :style="{ color: itemData.num > 0 ? '#14BE7D' : '#FC4A1A' }"
        style="font-size: 15px"
      >
        {{ itemData.num > 0 ? '+' : '' }}{{itemData.num}}
      </span>
    </q-item-section>
  </q-item>
</template>

<script>
import { date } from 'quasar'
export default {
  props: {
    itemData: Object
  },
  filters: {
    dateFormat(d) {
      return date.formatDate(d, 'YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped></style>
