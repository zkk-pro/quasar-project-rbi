<template>
  <div class="q-px-md recharge-box">
    <span>{{$t('assets_recharge_address')}}</span>
    <div
      class="column items-center q-mt-sm"
      style="background: rgba(255, 255, 255, 0.05);height: 100%"
    >
      <span class="q-pt-lg pc_title">{{$t('assets_my_address')}}</span>
      <div class="q-pt-md pc_address">{{ address }}</div>
      <div class="q-mt-xl q-mb-md pc_btn">
        <q-btn
          outline
          color="primary"
          no-caps
          :label="$t('assets_copy')"
          class="q-mr-lg"
          style="width:120px; height: 36px"
          @click="copyAddress"
        />
        <q-btn
          color="primary"
          text-color="dark"
          no-caps
          :label="$t('assets_qrcode')"
          style="width:120px; height: 36px"
          @click=";[(showQrcode = true)]"
        />
      </div>
    </div>
    <!-- 二维码 -->
    <q-dialog v-model="showQrcode">
      <q-card class="qr-card">
        <q-icon :name="'img:' + qrcode" style="width:100%; height: 100%" />
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
          message: this.$t('notify_copy_address_success')
        })
      } catch (error) {
        console.log(error)
        this.$q.notify({
          icon: 'warning',
          textColor: 'red',
          message: this.$t('notify_copy_address_fail')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recharge-box {
  margin-bottom: 40px;
}

@media screen and (min-width: 599px) {
  .recharge-box {
    width: 670px;
    height: 240px;
    margin: 8px auto 40px;
  }
  .pc_title {
    padding-top: 48px;
  }
  .pc_address {
    padding-top: 30px;
  }
  .pc_btn {
    margin-top: 58px;
  }
}
.qr-card {
  width: 360px;
  height: 360px;
}

.screen--xs {
  .qr-card {
    width: 160px;
    height: 160px;
  }
}
</style>
