<template>
  <div class="number">
    <span class="big" :style="{fontSize: bigSize}">{{ numberArr[0] }}</span>
    <span class="small" :style="{fontSize: smallSize}" v-if="numberArr[1]">.{{ numberArr[1] }}</span>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: [Number, String],
      required: true
    },
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
      const n = this.number.toString()
      return n.split('.')
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
