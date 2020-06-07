<template>
  <div class="node-v  row items-center" :class="'node-v-' + node">V{{node}}&nbsp;{{$t('mining_node')}}</div>
</template>

<script>
export default {
  props: {
    node: {
      type: [String, Number]
    }
  }
}
</script>

<style lang="scss" scoped>
.node-v {
  color: $primary;
  font-weight: bold;
  &::before {
    content: '';
    display: inline-block;
    width: 52px;
    height: 18px;
    margin-right: 8px;
  }
}
.node-v-1 {
  &::before {
    background: url('~assets/images/node-v1.png');
    background-size: 100% 100%;
  }
}
.node-v-2 {
  &::before {
    background: url('~assets/images/node-v2.png');
    background-size: 100% 100%;
  }
}
.node-v-3 {
  &::before {
    background: url('~assets/images/node-v3.png');
    background-size: 100% 100%;
  }
}
.node-v-4 {
  &::before {
    background: url('~assets/images/node-v4.png');
    background-size: 100% 100%;
  }
}
.node-v-5 {
  &::before {
    background: url('~assets/images/node-v5.png');
    background-size: 100% 100%;
  }
}
.node-v-6 {
  &::before {
    background: url('~assets/images/node-v6.png');
    background-size: 100% 100%;
  }
}
.node-v-7 {
  &::before {
    background: url('~assets/images/node-v7.png');
    background-size: 100% 100%;
  }
}
.node-v-8 {
  &::before {
    background: url('~assets/images/node-v8.png');
    background-size: 100% 100%;
  }
}
.node-v-9 {
  &::before {
    background: url('~assets/images/node-v9.png');
    background-size: 100% 100%;
  }
}
.node-v-10 {
  &::before {
    background: url('~assets/images/node-v10.png');
    background-size: 100% 100%;
  }
}
</style>
