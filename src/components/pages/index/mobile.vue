<template>
  <q-page>
    <q-carousel
      height="210px"
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
        v-for="(item, index) in banner"
        :key="index"
        :name="index"
        :img-src="item.img"
        @click="linkTo(item.link)"
        style="background-size:100% 100%"
      >
      </q-carousel-slide>
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

    <div class="intro q-mt-lg column justify-center items-center q-px-md">
      <img
        src="~assets/images/index1.png"
        width="120"
        height="27"
        class="center-img"
      />
      <div class="intro1-content intro-content q-px-md q-py-md q-mt-md">
        {{ $t('index_description_0') }}{{ $t('index_description_1') }}
      </div>
    </div>
    <div class="intro q-mt-xl column justify-center items-center q-px-md">
      <img
        src="~assets/images/index2.png"
        width="120"
        height="27"
        class="center-img"
      />
      <div class="intro-content q-py-md q-mt-md">
        {{ $t('index_release') }}
      </div>
      <q-markup-table separator="cell" flat class="intro-table">
        <thead>
          <tr>
            <th style="width:26%">{{ $t('index_category') }}</th>
            <th style="width:26%">{{ $t('index_number') }}</th>
            <th>{{ $t('index_release_notes') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ $t('index_intro2Column[0].title') }}</td>
            <td>{{ $t('index_intro2Column_bill1') }}</td>
            <td>{{ $t('index_intro2Column[0].detail') }}</td>
          </tr>
          <tr>
            <td>{{ $t('index_intro2Column[1].title') }}</td>
            <td>{{ $t('index_intro2Column_bill2') }}</td>
            <td>{{ $t('index_intro2Column[1].detail') }}</td>
          </tr>
          <tr>
            <td>{{ $t('index_intro2Column[2].title') }}</td>
            <td>{{ $t('index_intro2Column_bill2') }}</td>
            <td>{{ $t('index_intro2Column[2].detail') }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="intro q-mt-xl column justify-center items-center q-px-md">
      <img
        src="~assets/images/index3.png"
        width="120"
        height="27"
        class="center-img"
      />
      <div class="intro3-content q-mt-md ">
        <div class="intro-title">
          {{ $t('index_register_0') }}
        </div>
        <div class="intro-list q-ml-xs q-my-md one-icon">
          {{ $t('index_register_1') }}
        </div>
        <div class="intro-content q-my-md q-ml-lg">
          <p class="q-mb-sm">
            {{ $t('index_register_rules1') }}
            {{ $t('index_register_rules2') }}
          </p>
          <p class="q-mb-sm">
            {{ $t('index_register_rules3') }}
          </p>
        </div>
        <img src="~assets/images/sheet1.png" alt="" width="100%" />
        <div class="intro-list q-ml-xs q-my-md two-icon">
          {{ $t('index_invite') }}
        </div>
        <div class="intro-content q-my-md q-ml-lg">
          <p class="q-mb-sm">
            {{ $t('index_invite_rules1') }}
          </p>
          <p class="q-mb-sm">
            {{ $t('index_invite_rules2') }}
          </p>
          <p class="q-mb-sm">
            {{ $t('index_invite_rules3') }}
          </p>
        </div>
      </div>
    </div>
    <div class="intro q-mt-lg column justify-center items-center q-px-md">
      <img
        src="~assets/images/index4.png"
        width="120"
        height="27"
        class="center-img"
      />
      <div class="intro-content q-py-md q-mt-md">
        {{ $t('index_pos_mining') }}
      </div>
      <img
        src="~assets/images/formula.png"
        alt=""
        width="285"
        height="56"
        class="q-my-md"
      />
      <p class="text-center formula">
        {{ $t('index_pos_trans') }}
      </p>
      <img src="~assets/images/sheet2.png" alt="" width="100%" />
      <p class="text-center formula q-mt-md" style="color:#fff;width:100%">
        {{ $t('index_pos_node') }}
      </p>
      <q-markup-table
        separator="cell"
        bordered
        square
        class="intro-table intro4-table"
      >
        <thead>
          <tr>
            <th style="width:50%">{{ $t('index_node_level') }}</th>
            <th>{{ $t('index_node_quality') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>v1</td>
            <td>100</td>
          </tr>
          <tr>
            <td>v2</td>
            <td>200</td>
          </tr>
          <tr>
            <td>v3</td>
            <td>500</td>
          </tr>
          <tr>
            <td>v4</td>
            <td>800</td>
          </tr>
          <tr>
            <td>v5</td>
            <td>2000</td>
          </tr>
          <tr>
            <td>v6</td>
            <td>5000</td>
          </tr>
          <tr>
            <td>v7</td>
            <td>8000</td>
          </tr>
          <tr>
            <td>v8</td>
            <td>15000</td>
          </tr>
          <tr>
            <td>v9</td>
            <td>30000</td>
          </tr>
          <tr>
            <td>v10</td>
            <td>50000</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>
  </q-page>
</template>

<script>
import { getIndexInfo } from 'src/api/apiList'

export default {
  name: 'PageIndex',
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
    // 轮播图打开新页面
    linkTo(link) {
      if (link !== '#') window.open(link, '_blank')
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
// 组件样式覆盖
/deep/ .q-carousel__slide {
  padding: 0;
}
.intro-table {
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  background: rgba($color: #fff, $alpha: 0.2);
  th,
  td {
    text-align: center;
    background-color: #151530;
    margin: -1px;
    border-color: rgba($color: #fff, $alpha: 0.2);
  }
  th {
    padding: 10px 0;
  }
  td {
    padding: 15px 10px;
    line-height: 18px;
    white-space: inherit;
  }
}
.intro4-table {
  th,
  td {
    height: 44px;
    line-height: 44px;
  }
}
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
  width: 90%;
}
.notice-more {
  color: #3971cd;
  font-size: 10px;
}
.intro-content {
  border-radius: 5px;
  color: #fff;
  font-size: 13px;
  line-height: 22px;
  box-sizing: border-box;
  p {
    line-height: inherit;
    font-size: inherit;
  }
}
.intro1-content {
  background: #151530;
}
.center-img {
  margin: 0 auto;
  display: block;
}
.intro-title {
  color: $primary;
}
.intro-list {
  color: $primary;
}
.formula {
  width: 88%;
  color: #999;
  font-size: 13px;
  line-height: 22px;
}
</style>
