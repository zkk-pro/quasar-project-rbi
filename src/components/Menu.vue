<template>
  <!-- :target="target" -->
  <!-- max-width="125px" -->
  <q-menu
    ref="menu"
    :offset="[-30, 18]"
    self="top right"
    :content-style="{ overflow: 'visible', position: 'relative' }"
  >
    <div :class="showClass">
      <slot name="triangleIcon"></slot>
      <q-list style="width: 125px">
        <div v-for="item in menuData" :key="item.path">
          <q-item
            clickable
            v-close-popup
            class="row items-center"
            :to="item.path"
            active-class="none"
          >
            <q-icon :name="'img:statics/icons/' + item.icon + '.png'"></q-icon>
            <span class="q-ml-sm full-height text-dark">
              {{ item.text }}
            </span>
          </q-item>
          <q-separator />
        </div>
        <slot />
      </q-list>
    </div>
  </q-menu>
</template>

<script>
export default {
  props: {
    menuData: {
      type: Array,
      required: true
    },
    self: {
      type: String,
      default: 'top right'
    },
    showClass: {
      type: String,
      default: 'lt-sm'
    }
  },
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    hide() {
      this.$refs.menu.hide()
    }
  }
}
</script>

<style lang="scss" scoped></style>
