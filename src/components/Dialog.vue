<template>
  <q-dialog v-model="show" persistent @hide="onDialogHide" >
    <q-card
      class="column justify-between dialog-card"
    >
      <q-card-section class="q-pb-none">
        <div style="font-size:16px; color:#333">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none q-pb-none">
        <slot />
      </q-card-section>
      <q-card-actions  class="q-pt-none justify-between">
        <!-- 左下角slot -->
        <div class="full-height">
          <slot name="leftBottom" />
        </div>
        <div style="height:36px">
          <q-btn
            label="取消"
            color="blue-grey-8"
            text-color="blue-grey-8"
            outline
            @click=";[(confirmClick = false), $emit('cancel')]"
            v-close-popup
            style="margin-right: 20px"
          />
          <q-btn
            unelevated
            label="确定"
            color="primary"
            text-color="blue-grey-8"
            @click="confirm"
          />
        </div>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    confirmHold: Boolean
  },
  data() {
    return {
      show: false,
      confirmClick: false
    }
  },

  methods: {
    // 显示弹框
    open() {
      this.show = true
    },
    // 关闭
    close() {
      this.show = false
    },
    // 确认按钮
    confirm() {
      console.log(this.confirmHold)
      if (this.confirmHold) {
        this.$emit('confirm')
      } else {
        this.confirmClick = true
        this.close()
      }
    },
    // 弹框隐藏事件
    onDialogHide() {
      this.$emit('hide')
      this.confirmClick && this.$emit('confirm')
    }
  },
  watch: {
    confirmHold(val) {
      if (!this.confirmHold) {
        this.confirm()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tips-text {
  color: #666;
  margin-top: 10px;
  font-size: 13px;
  height: 13px;
}
</style>
