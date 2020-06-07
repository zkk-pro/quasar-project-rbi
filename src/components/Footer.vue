<template>
  <div class="footer-box row justify-center">
    <div class="fit row justify-center items-center lt-sm">
      <div>
        <q-btn dense flat color="primary" :label="$t('footer_kefu1')">
          <q-popup-proxy>
            <img
              src="~assets/pc_images/service-1.jpeg"
              alt=""
              width="200px"
              height="200px"
            />
          </q-popup-proxy>
        </q-btn>
        <q-btn dense flat color="primary" :label="$t('footer_kefu2')">
          <q-popup-proxy>
            <img
              src="~assets/pc_images/service-2.jpeg"
              alt=""
              width="200px"
              height="200px"
            />
          </q-popup-proxy>
        </q-btn>
        <q-btn
          dense
          flat
          color="primary"
          :label="$t('footer_group')"
          @click="linkTo"
        >
        </q-btn>
      </div>
      <div class="row items-center">
        <img
          class="m-logo-img"
          src="~assets/images/footer-logo.png"
          alt="logo"
        />
        <span class="sologan">{{ $t('footer_sologan') }}</span>
      </div>
    </div>
    <div class="p-footer gt-xs row justify-between" style="width: 1200px">
      <div>
        <img
          src="~assets/pc_images/footer-logo.png"
          width="140px"
          height="66px"
          alt="footer-logo"
        />
        <div class="sologan q-mt-lg">{{ $t('footer_sologan') }}</div>
      </div>
      <div class="row">
        <q-list>
          <q-item
            clickable
            v-ripple
            v-for="item in menu"
            :key="item.text"
            :to="item.path"
            active-class="none"
          >
            <q-item-section>{{ $t(item.text) }}</q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section>{{ $t('footer_contact') }}</q-item-section>
          </q-item>
          <q-item class="q-py-none">
            <q-item-section>
              <img
                src="~assets/pc_images/service-1.jpeg"
                alt=""
                width="100px"
                height="100px"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section style="color: rgba(255,255,255,0.4)">{{
              $t('footer_kefu1')
            }}</q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section></q-item-section>
          </q-item>
          <q-item class="q-py-none">
            <q-item-section>
              <img
                src="~assets/pc_images/service-2.jpeg"
                alt=""
                width="100px"
                height="100px"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section style="color: rgba(255,255,255,0.4)">{{
              $t('footer_kefu2')
            }}</q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section></q-item-section>
          </q-item>
          <q-item class="q-py-none">
            <q-item-section style="width: 100px; height: 100px">
              <a href="http://t.me/RiskfreeBasicIncome10" target="_blank">
                <img
                  src="~assets/pc_images/footer-telegram.png"
                  alt=""
                  width="50px"
                  height="50px"
                />
              </a>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section style="color: rgba(255,255,255,0.4)">{{
              $t('footer_group')
            }}</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { text: 'footer_home', path: '/' },
        { text: 'footer_mining', path: '/mining' },
        { text: 'footer_assets', path: '/assets' },
        { text: 'footer_notice', path: '/message-list' }
      ]
    }
  },
  methods: {
    linkTo() {
      window.open('http://t.me/RiskfreeBasicIncome10', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-box {
  height: 400px;
  background: #0a0a1a;
}
.screen--xs {
  .footer-box {
    height: 100px;
    background: #161934;
  }
}
.m-logo-img {
  width: 82px;
  height: 42px;
}
.m-sologan {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-left: 16px;
}
.p-footer {
  padding-top: 95px;
}
</style>
