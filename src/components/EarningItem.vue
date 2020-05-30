<template>
  <q-item class="q-py-md q-px-none row full-width" >
    <q-item-section>
      <div>V2节点挖矿收益</div>
      <div class="q-mt-md text-grey-8" style="font-size: 11px">
        2020-05-06 14:22:12
      </div>
    </q-item-section>
    <q-item-section style="text-align: right">
      <!-- + #14BE7D  - #FC4A1A -->
      <span
        :style="{ color: 123 > 0 ? '#14BE7D' : '#FC4A1A' }"
        style="font-size: 15px"
      >
        {{ 123 > 0 ? '+' : '-' }}123
      </span>
    </q-item-section>
  </q-item>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
