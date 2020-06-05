<template>
  <div class="q-px-md">
    <span>RBI充币</span>
    <div
      class="column items-center q-mt-sm"
      style="background: rgba(255, 255, 255, 0.05); margin-bottom: 40px"
    >
      <span class="q-pt-lg">我的RBI地址</span>
      <div class="q-pt-md">{{ address }}</div>
      <div class="q-mt-xl q-mb-md">
        <q-btn
          outline
          color="primary"
          label="复制地址"
          class="q-mr-lg"
          style="width:120px; height: 36px"
          @click="copyAddress"
        />
        <q-btn
          color="primary"
          text-color="dark"
          label="二维码"
          style="width:120px; height: 36px"
          @click=";[(showQrcode = true)]"
        />
      </div>
    </div>
    <!-- 二维码 -->
    <q-dialog v-model="showQrcode">
      <q-card class="my-card" style="width: 180px">
        <q-icon
          :name="'img:'+ qrcode"
          size="180px"
        />
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  props: {
    address: String,
    qrcode: String
  },
  data() {
    return {
      showQrcode: false // 显示二维码
    }
  },
  methods: {
    async copyAddress() {
      try {
        await this.$copyText(this.address)
        this.$q.notify({
          icon: 'done',
          textColor: 'green',
          message: '地址复制成功'
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          icon: 'warning',
          textColor: 'red',
          message: '地址复制失败'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
