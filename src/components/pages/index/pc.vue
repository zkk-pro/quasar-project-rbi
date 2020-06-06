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
        v-for="(item, index) in banner"
        :key="index"
        :name="index"
        :img-src="item.img"
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
        >查看更多>></router-link
      >
    </div>
    <div class="intro column justify-center items-center">
      <div style="max-width: 565px">
      <img
        src="~assets/pc_images/p_index1.png"
        class="center-img"
      /></div>
      <div class="intro1-content intro-content q-mt-lg q-px-lg">
        <span class="big">Risk-free Basic Income（简称：RBI）</span
        >旨在打造人人平等，互惠互助，每人都有基本收入保障的普惠金融体系。在去中心化的区块链世界里，人与人之间的关系是可信任的，自由和透明的，我们确信基于链上去中心化信任纽带所带来的信息是可以产生价值的，这也是大数据时代的核心价值。在区块链的世界里，人和人的关系是平等、自由的可以参与到任何的信息交换，由此我们建立全新的金融体系，汇集数据产生价值。我们依托区块链重新赋能信息交换所带来的数据价值，借助其去中心化通证经济模型，打造一套人人都有无风险基本收入的普惠金融体系，参与其中的任何人都可以得到基本的无风险基本收入保障RBI。
      </div>
    </div>
    <div class="intro intro-even q-pt-xl column justify-center items-center">
      <img
        src="~assets/pc_images/p_index2.png"
        width="117"
      />
      <div class="intro2-content intro-content q-mt-lg q-px-lg">
        RBI共发行3亿枚，其中50%的币进行空投，即1.5亿枚，从其中拿出100万枚用于做星星之火市场活动。另外50%通过POS挖矿产出，即1.5亿枚。
      </div>
      <div class="intro2-column q-mt-xl row justify-between q-px-lg">
        <div
          class="column-item column justify-center items-center"
          v-for="(item, index) in intro2Column"
          :key="index"
        >
          <img :src="item.img" alt="" />
          <span class="q-mt-lg q-mb-md color1">{{ item.title }}</span>
          <span class="q-mb-sm">{{ item.bill }}</span>
          <span>{{ item.detail }}</span>
        </div>
      </div>
    </div>
    <div class="intro q-pt-xl column justify-center items-center  col-11">
      <img
        src="~assets/pc_images/p_index3.png"
         width="158"
      />
      <div class="intro3 color1 q-mb-md text-left q-px-lg">
        空投合作交易所N9EX.COM
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
              <span class="color1">注册交易空投1000RBI</span>
            </div>
            <div class="intro3-content q-ml-lg">
              <p>
                规则：注册并实名后即送500个币（T+1天到账），交易指定的交易对RBI/USDT，交易额满10USDT，再送500个币（RBI在交易时，最低交易量为100RBI）。
              </p>
              <p>锁仓机制：空投的币种锁仓365天，每天释放1/365。</p>
              <p>
                实名注册空投数量递减规则：注册送500个币，每达到1000人实名注册，注册赠币数量递减10%，减产上限是10次，当减产到第十次，将停止减产。
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
              <span class="color1">邀请返佣</span>
            </div>
            <div class="intro3-content q-ml-lg">
              <p>
                规则：每邀请一人注册并实名，并交易指定的交易对RBI/USDT，交易额满10USDT（RBI在交易时，最低交易量为100RBI）；
              </p>
              <p>奖励：送邀请人30个RBI/人，只算一级邀请，邀请不设上限；</p>
              <p>
                注册赠币和邀请返佣的锁仓机制：邀请返佣的币锁仓365天，每天释放1/365。
              </p>
            </div>
          </div>
        </div>
        <div class="intro-right col-sm-12 col-md-6 q-px-xl q-mt-lg" style="max-width: 550px">
          <img
            src="~assets/pc_images/p_sheet1.png"
            alt=""
            class="q-mt-lg center-img"
          />
        </div>
      </div>
    </div>
    <div class="intro intro-even q-pt-xl column justify-center items-center">
      <img
        src="~assets/pc_images/p_index4.png"
        width="107px"
      />
      <div class="intro2-content intro-content q-mt-lg q-mb-xl q-px-lg">
        POS挖矿是依据参与不同等级节点的人数按比例分配收益的。POS挖矿释放数量跟实际空投的数量有直接的关系，POS挖矿产币释放规则计算公式如下：
      </div>
      <img
        src="~assets/images/formula.png"
        width="285"
        height="56"
        alt=""
        class="q-mb-md"
      />
      <p class="formula q-mt-lg q-px-lg">
        Sn : 第n天的释放数量；N：第几天；X: 实际空投数量； P：POS年化利率
      </p>
      <div style="max-width: 974px">
      <img
        src="~assets/pc_images/p_sheet2.png"
        alt=""
        class="q-my-xl center-img"
      />
      </div>
      <p class="q-my-xl q-px-lg">
        分阶段开放不同等级的POS节点，每个阶段的节点收益分配比例根据实际情况调整
      </p>
      <div style="max-width: 1150px">
      <img
        src="~assets/pc_images/p_node_line.png"
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
      currentText: 0,
      intro2Column: [
        {
          img: require('src/assets/pc_images/p_index_icon1.png'),
          title: 'RBI发行总量',
          bill: '发行3亿枚',
          detail: '恒定不变'
        },
        {
          img: require('src/assets/pc_images/p_index_icon2.png'),
          title: '空投',
          bill: '发行1.5亿枚',
          detail: '其中的100万枚用于做星星之火市场活动'
        },
        {
          img: require('src/assets/pc_images/p_index_icon3.png'),
          title: 'POS挖矿',
          bill: '1.5亿枚',
          detail: '分阶段开启不同的节点等级'
        }
      ]
    }
  },
  methods: {
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

.center-img{
  width: 100%;
}
.screen--xs .center-img{
  margin-top: 20px;
  margin-bottom: 20px;
}
.intro-info, .intro3{
  max-width: 1100px;
}
.intro2-column span{
  color: rgba(255,255,255,.6)
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
.screen--sm .intro2-column ,.screen--xs .intro2-column{
  max-width: 100%;
  width: 100%;
  min-width: unset;
}
.intro2-column .column-item{
  width: 30%;
}
.screen--xs .column-item{
  // max-width: 100%;
  width: 50%;
  margin-bottom: 40px;
  // min-width: unset;
}
.intro {
  padding: 90px 0;
}
.screen--xs .intro{
  padding: 40px 0;
}
.intro3 {
  margin-top: 100px;
  text-align: left;
  width: 100%;
}
.screen--xs .intro3{
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
