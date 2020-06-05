<template>
  <q-header :elevated="false" class="row justify-center bg-dark">
    <div class="header-box row items-center justify-between col-xs-11">
      <div class="gt-xs row items-center">
        <router-link to="/">
          <img
          src="~assets/pc_images/header_logo.png"
          width="67px"
          height="20px"
        />
        </router-link>
        <q-list bordered class="row" style="margin-left: 130px">
          <q-item class="q-px-md" clickable v-ripple v-for="item in leftMenu" :key="item.text" :to="item.path">
            <q-item-section>
              {{ item.text }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <q-icon
        name="img:statics/icons/menu-up.png"
        size="18px"
        class="left-menu lt-sm"
      ></q-icon>

      <!-- 左侧菜单 -->
      <Menu :menuData="leftMenu" target=".left-menu">
        <template v-slot:triangleIcon>
          <i class="triangle" style="left: 11px;"></i>
        </template>
      </Menu>

      <div class="header-title absolute-center lt-sm">RBI</div>
      <div class="row items-center">
        <q-icon
          v-if="$q.lang.isoName === 'en-us'"
          name="img:statics/icons/lang-zh.png"
          size="18px"
        ></q-icon>
        <q-icon
          v-else
          name="img:statics/icons/lang-en.png"
          size="18px"
        ></q-icon>
        <q-icon
          name="img:statics/icons/account.png"
          size="18px"
          class="account lt-sm"
          style="margin-left:20px"
        >
        </q-icon>
        <div class="gt-xs row " style="text-white; margin-left: 40px">
          <router-link to="/registry">注册</router-link>
          <span class="q-px-md">|</span>
          <router-link to="/login">登录</router-link>
        </div>

        <!-- 个人中心icon 菜单栏 -->
        <Menu :menuData="accountMenu" target=".account">
          <template v-slot:triangleIcon v-if="$store.getters.token">
            <i class="triangle"></i>
          </template>
          <template v-if="$store.getters.token">
            <q-item
              clickable
              v-close-popup
              class="row items-center"
              @click="logout"
            >
              <q-icon :name="'img:statics/icons/menu-exit.png'"></q-icon>
              <span class="q-ml-sm text-dark">退出</span>
            </q-item>
          </template>
        </Menu>
      </div>
    </div>
  </q-header>
</template>

<script>
import Menu from 'components/Menu'
export default {
  data() {
    return {
      leftMenu: [
        { text: '首页', icon: 'menu-home', path: '/' },
        { text: 'POS挖矿', icon: 'menu-pos', path: '/mining' },
        { text: '总资产', icon: 'menu-assets', path: '/assets' }
      ],
      accountMenu: [
        { text: '挖矿订单', icon: 'menu-order', path: '/mining-order' },
        { text: '收益明细', icon: 'menu-earning', path: '/earning-detail' },
        { text: '个人中心', icon: 'menu-user', path: '/user-info' }
      ]
    }
  },
  components: { Menu },
  methods: {
    logout() {
      this.$store.dispatch('Logout')
      this.$q.notify({
        message: '退出成功',
        icon: 'done',
        textColor: 'green'
      })
      setTimeout(() => {
        location.reload()
      }, 1500)
    }
  }
}
</script>

<style lang="scss" scoped>
.header-box {
  height: 60px;
  max-width: 1200px;
}
.screen--xs {
  .header-box {
    height: 44px;
  }
}
.header-title {
  font-size: 18px;
  text-align: center;
}
.triangle {
  border-width: 5px 5px;
  border-color: transparent transparent #fff transparent;
  border-style: solid;
  position: absolute;
  top: -10px;
  left: 100px;
}
</style>
