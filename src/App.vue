<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      // 节点input样式
      nodeInputStyle: {
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '4px'
      }
    }
  }
}
</script>
