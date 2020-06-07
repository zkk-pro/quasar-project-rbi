<template>
  <q-page>
    <q-carousel
      height="560px"
      v-model="currentImg"
      infinite
      keep-alive
      autoplay
      swipeable
      animated
      navigation
      transition-prev="slide-right"
      transition-next="slide-left"
      style="background: inherit"
    >
      <q-carousel-slide
        class="cursor-pointer"
        v-for="(item, index) in banner"
        :key="index"
        :name="index"
        :img-src="item.img"
        @click="linkTo(item.link)"
      />
    </q-carousel>
    <div class="notice-box flex items-center" v-if="noticeList.length > 0">
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
        <q-carousel-slide
          :name="item.id"
          v-for="item in noticeList"
          :key="item.id"
        >
          <router-link
            class="notice"
            :to="{ path: '/message-detail', query: { id: item.id } }"
          >
            <div class="notice-text">{{ item.title }}</div>
          </router-link>
        </q-carousel-slide>
      </q-carousel>
      <router-link to="/message-list" class="notice-more"
        >{{ $t('index_more') }}>></router-link
      >
    </div>
    <div class="intro column justify-center items-center">
      <div style="max-width: 565px">
        <img :src="getPImg('p_index1')" class="center-img" />
      </div>
      <div class="intro1-content intro-content q-mt-lg q-px-lg">
        <span class="big">{{ $t('index_description_0') }}</span
        >{{ $t('index_description_1') }}
      </div>
    </div>
    <div class="intro intro-even q-pt-xl column justify-center items-center">
      <img :src="getPImg('p_index2')" width="117" />
      <div class="intro2-content intro-content q-mt-lg q-px-lg text-center">
        {{ $t('index_release') }}
      </div>
      <div class="intro2-column q-mt-xl row justify-between q-px-lg">
        <div
          class="column-item column justify-center items-center"
          v-for="(item, index) in $t('index_intro2Column')"
          :key="index"
        >
          <img :src="getImg(item.img)" alt="" />
          <span class="q-mt-lg q-mb-md color1">{{ item.title }}</span>
          <span class="q-mb-sm">{{ item.bill }}</span>
          <span class="text-center">{{ item.detail }}</span>
        </div>
      </div>
    </div>
    <div class="intro q-pt-xl column justify-center items-center col-11">
      <img :src="getPImg('p_index3')" width="158" />
      <div class="intro3 color1 q-mb-md text-left q-px-lg">
        {{ $t('index_register_0') }}
      </div>
      <div class="intro-info row justify-center items-center q-mt-md">
        <div class="intro3-left col-sm-12 col-md-6 q-px-lg">
          <div class="intro3-column ">
            <div class="intro3-title q-pb-md">
              <img
                src="~assets/images/one-icon.png"
                alt=""
                class="intro3-icon q-mr-sm"
              />
              <span class="color1">{{ $t('index_register_1') }}</span>
            </div>
            <div class="intro3-content q-ml-lg">
              <p>
                {{ $t('index_register_rules1') }}
              </p>
              {{ $t('index_register_rules2') }}
              <p></p>
              <p>
                {{ $t('index_register_rules3') }}
              </p>
            </div>
          </div>
          <div class="intro3-column q-mt-lg">
            <div class="intro3-title q-pb-md">
              <img
                src="~assets/images/two-icon.png"
                alt=""
                class="intro3-icon q-mr-sm"
              />
              <span class="color1">{{ $t('index_invite') }}</span>
            </div>
            <div class="intro3-content q-ml-lg">
              <p>
                {{ $t('index_invite_rules1') }}
              </p>
              {{ $t('index_invite_rules2') }}
              <p></p>
              <p>
                {{ $t('index_invite_rules3') }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="intro-right col-sm-12 col-md-6 q-px-xl q-mt-lg"
          style="max-width: 550px"
        >
          <img
            :src="getPImg('p_sheet1')"
            alt=""
            class="q-mt-lg center-img"
          />
        </div>
      </div>
    </div>
    <div class="intro intro-even q-pt-xl column justify-center items-center">
      <img :src="getPImg('p_index4')" width="107px" />
      <div class="intro2-content intro-content q-mt-lg q-mb-xl q-px-lg text-center">
        {{ $t('index_pos_mining') }}
      </div>
      <img
        src="~assets/images/formula.png"
        width="285"
        height="56"
        alt=""
        class="q-mb-md"
      />
      <p class="formula q-mt-lg q-px-lg">
        {{ $t('index_pos_trans') }}
      </p>
      <div style="max-width: 974px">
        <img
          :src="getPImg('p_sheet2')"
          alt=""
          class="q-my-xl center-img"
        />
      </div>
      <p class="q-my-xl q-px-lg">
        {{ $t('index_pos_node') }}
      </p>
      <div style="max-width: 1150px">
        <img
          :src="getPImg('p_node_line')"
          alt=""
          class="q-my-xl center-img"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { getIndexInfo } from 'src/api/apiList'
export default {
  name: 'indexPc',
  data() {
    return {
      banner: [],
      noticeList: [],
      open: false,
      currentImg: 0,
      currentText: 0
    }
  },
  methods: {
    getPImg(src) {
      return require(`src/assets/pc_images/${this.$t(src)}.png`)
    },
    getImg(src) {
      return require(`src/assets/pc_images/p_index_icon${src}.png`)
    },
    // 轮播图打开新页面
    linkTo(link) {
      window.open(link, '_blank')
    },
    async getIndexInfo() {
      const { data } = await getIndexInfo()
      this.banner = data.banner
      this.noticeList = data.notice
      this.currentText = data.notice[0].id
    }
  },
  created() {
    this.getIndexInfo()
  }
}
</script>

<style lang="scss" scoped>
.center-img {
  width: 100%;
}
.intro2-content {
  max-width: 1200px;
  box-sizing: border-box;
}
.screen--xs .center-img {
  margin-top: 20px;
  margin-bottom: 20px;
}
.intro-info,
.intro3 {
  max-width: 1100px;
}
.intro2-column span {
  color: rgba(255, 255, 255, 0.6);
}
.formula {
  color: #999;
  font-size: 14px;
}
.intro3-icon {
  width: 12px;
  height: 12px;
}
.intro3-content p {
  line-height: 30px;
  font-size: 14px;
  margin: 0;
}
.color1 {
  color: #00e6ff;
}
.q-page {
  background: rgba(24, 24, 55, 1);
}
.intro-even {
  background: rgba(26, 26, 60, 1);
}
.intro-content {
  font-size: 14px;
  line-height: 30px;
}
.intro1-content {
  max-width: 870px;
}
.intro2-column {
  min-width: 1000px;
  img {
    width: 60px;
  }
}
.screen--sm .intro2-column,
.screen--xs .intro2-column {
  max-width: 100%;
  width: 100%;
  min-width: unset;
}
.intro2-column .column-item {
  width: 30%;
}
.screen--xs .column-item {
  width: 50%;
  margin-bottom: 40px;
}
.intro {
  padding: 90px 0;
}
.screen--xs .intro {
  padding: 40px 0;
}
.intro3 {
  margin-top: 100px;
  text-align: left;
  width: 100%;
}
.screen--xs .intro3 {
  margin-top: 40px;
}
.big {
  font-size: 20px;
}
.notice-box {
  height: 40px;
  padding: 0 10px;
  max-width: 1200px;
  margin: 0 auto;
}
.notice {
  position: absolute;
  top: 0;
  left: 0;
}
.notice-text {
  color: #3971cd;
  font-size: 14px;
  margin-left: 10px;
  line-height: 40px;
}
.notice-more {
  color: #3971cd;
  font-size: 12px;
}
</style>
