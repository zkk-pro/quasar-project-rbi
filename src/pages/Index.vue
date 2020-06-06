<template>
  <div>
    <IndexMobile class="lt-sm"/>
    <IndexPc class="gt-xs"/>
  </div>
</template>

<script>
import IndexMobile from 'components/pages/index/mobile'
import IndexPc from 'components/pages/index/pc'
export default {
  components: { IndexPc, IndexMobile }
}
</script>

<style lang="scss" scoped></style>
