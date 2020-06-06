<template>
  <div class="footer-box row justify-center">
    <div class="fit flex justify-center items-center lt-sm">
      <img class="m-logo-img" src="~assets/images/footer-logo.png" alt="logo" />
      <span class="sologan">人人都能得到无风险基本收入RBI</span>
    </div>
    <div
      class="p-footer gt-xs row justify-between"
      style="width: 1200px"
    >
      <div>
        <img
          src="~assets/pc_images/footer-logo.png"
          width="140px"
          height="66px"
          alt="footer-logo"
        />
        <div class="sologan q-mt-lg">人人都能得到无风险基本收入RBI</div>
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
            <q-item-section>{{ item.text }}</q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section>联系我们</q-item-section>
          </q-item>
          <q-item class="q-py-none">
            <q-item-section style="width: 100px; height: 100px">
              <img
                src="~assets/pc_images/service-1.jpeg"
                alt=""
                width="100%"
                height="100%"
              />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section style="color: rgba(255,255,255,0.4)"
              >微信官方客服 1</q-item-section
            >
          </q-item>
        </q-list>
        <q-list>
          <q-item>
            <q-item-section></q-item-section>
          </q-item>
          <q-item class="q-py-none">
            <q-item-section style="width: 100px; height: 100px">
                <img
                  src="~assets/pc_images/service-2.jpeg"
                  alt=""
                  width="100%"
                  height="100%"
                />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section style="color: rgba(255,255,255,0.4)"
              >微信官方客服 2</q-item-section
            >
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
            <q-item-section style="color: rgba(255,255,255,0.4)"
              >海外电报群</q-item-section
            >
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
        { text: '首页', path: '/' },
        { text: 'POS挖矿', path: '/mining' },
        { text: '总资产', path: '/assets' },
        { text: '公告', path: '/message-list' }
      ]
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
    height: 80px;
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
