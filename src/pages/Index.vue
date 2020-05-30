<template>
  <q-page>
    <q-btn
      color="text-white"
      label="显示弹框"
      @click="$refs.safeDialog.open()"
    />
    <safe-validate ref="safeDialog" validType="google" />
    <q-carousel
      height="210px"
      v-model="currentImg"
      infinite
      autoplay
      keep-alive
      swipeable
      animated
      navigation
      transition-prev="slide-right"
      transition-next="slide-left"
      style="background: inherit"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://cdn.quasar.dev/img/mountains.jpg"
      />
      <q-carousel-slide
        :name="2"
        img-src="https://cdn.quasar.dev/img/parallax1.jpg"
      />
    </q-carousel>

    <div class="notice-box flex items-center" >
      <q-icon name="img:statics/icons/notice.png" size="14px" />
      <q-carousel
        height="100%"
        v-model="currentText"
        infinite
        autoplay
        animated
        transition-prev="slide-down"
        transition-next="slide-up"
        style="background: inherit; flex: 1"
      >
        <q-carousel-slide :name="1">
          <div class="notice">
            <div class="notice-text">消息111111</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2">
          <div class="notice">
            <div class="notice-text">消息222222</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <div class="notice-more">查看更多>></div>
    </div>
    <Footer />
  </q-page>
</template>

<script>
import SafeValidate from 'components/SafeValidate'
import Footer from 'components/Footer'

export default {
  name: 'PageIndex',
  data() {
    return {
      open: false,
      currentImg: 1,
      currentText: 1
    }
  },
  components: { SafeValidate, Footer }
}
</script>

<style lang="scss" scoped>
.notice-box {
  height: 32px;
  padding: 0 10px;
}
.notice {
  position: absolute;
  top: 0;
  left: 0;
}
.notice-text {
  color: #fff;
  font-size: 11px;
  margin-left: 10px;
  line-height: 32px;
}
.notice-more {
  color: #3971cd;
  font-size: 10px;
}
</style>
