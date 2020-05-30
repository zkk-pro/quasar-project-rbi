<template>
  <q-menu
    :offset="[5, 18]"
    max-width="120px"
    :target="target"
    :content-style="{ overflow: 'visible', position: 'relative' }"
  >
    <slot name="triangleIcon"></slot>
    <q-list style="width: 120px">
      <div v-for="item in menuData" :key="item.path">
        <q-item clickable v-close-popup class="row items-center" :to="item.path" active-class="none">
          <q-icon :name="'img:statics/icons/' + item.icon + '.png'"></q-icon>
          <span class="q-ml-sm full-height text-dark">
            {{ item.text }}
          </span>
        </q-item>
        <q-separator />
      </div>
      <slot />
    </q-list>
  </q-menu>
</template>

<script>
export default {
  props: {
    menuData: {
      type: Array,
      required: true
    },
    // 那个目标触发该菜单
    target: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
