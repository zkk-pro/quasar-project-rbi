<template>
  <div class="number">
    <span class="big" :style="{ fontSize: bigSize }">{{ numberArr[0] }}</span>
    <span class="small" :style="{ fontSize: smallSize }" v-if="numberArr[1]"
      >.{{ numberArr[1] }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: [Number, String],
      required: true
    },
    // number: [Number, String],
    bigSize: {
      type: String,
      default: '24px'
    },
    smallSize: {
      type: String,
      default: '18px'
    }
  },
  computed: {
    numberArr() {
      if (this.number) {
        const n = this.number.toString()
        return n.split('.')
      }
      return '0'
    }
  }
}
</script>

<style lang="scss" scoped>
.number {
  font-weight: bold;
  span {
    color: #fff;
  }
}
</style>
