<template>
  <q-page>
    <q-btn
      color="text-white"
      label="显示弹框"
      @click="$refs.safeDialog.open()"
    />
    <safe-validate ref="safeDialog" validType="email" />
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

    <div class="notice-box flex items-center">
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
          <div class="notice" @click="messageDetail">
            <div class="notice-text">消息111111</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide :name="2">
          <div class="notice" @click="messageDetail">
            <div class="notice-text">消息222222</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
      <router-link to="/message" class="notice-more">查看更多>></router-link>
      <!-- <div class="notice-more" @click="messageList">查看更多>></div> -->
    </div>

    <div class="intro q-mt-lg column justify-center items-center q-px-md">
      <img
        src="~assets/images/index1.png"
        width="120"
        height="27"
        class="center-img"
      />
      <div class="intro1-content intro-content q-px-md q-py-md q-mt-md">
        （简称：RBI）旨在打造人人平等，互惠互助，每人都有基本收入保障的普惠金融体系。在去中心化的区块链世界里，人与人之间的关系是可信任的，自由和透明的，我们确信基于链上去中心化信任纽带所带来的信息是可以产生价值的，这也是大数据时代的核心价值。在区块链的世界里，人和人的关系是平等、自由的可以参与到任何的信息交换，由此我们建立全新的金融体系，汇集数据产生价值。我们依托区块链重新赋能信息交换所带来的数据价值，借助其去中心化通证经济模型，打造一套人人都有无风险基本收入的普惠金融体系，参与其中的任何人都可以得到基本的无风险基本收入保障RBI。
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
        RBI共发行3亿枚，其中50%的币进行空投，即1.5亿枚，从其中拿出100万枚用于做星星之火市场活动。另外50%通过POS挖矿产出，即1.5亿枚。
      </div>
      <q-markup-table separator="cell" flat class="intro-table">
        <thead>
          <tr>
            <th style="width:26%">类目</th>
            <th style="width:26%">发行数量</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RBI发行总量</td>
            <td>3亿枚</td>
            <td>恒定不变</td>
          </tr>
          <tr>
            <td>空投</td>
            <td>1.5亿枚</td>
            <td>
              其中的100万枚用于 做星星之火市场活动
            </td>
          </tr>
          <tr>
            <td>POS挖矿</td>
            <td>1.5亿枚</td>
            <td>
              分阶段开启 不同的节点等级
            </td>
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
          空投合作交易所N9EX.COM
        </div>
        <div class="intro-list q-ml-xs q-my-md">
          1.注册交易空投1000RBI
        </div>
        <div class="intro-content q-my-md q-ml-lg">
          <p class="q-mb-sm">
            规则：注册并实名后即送500个币（T+1天到账），交易指定的交易对RBI/USDT，交易额满10USDT，再送500个币（RBI在交易时，最低交易量为100RBI）。
            锁仓机制：空投的币种锁仓365天，每天释放1/365。
          </p>
          <p class="q-mb-sm">
            实名注册空投数量递减规则：注册送500个币，每达到1000人实名注册，注册赠币数量递减10%，减产上限是10次，当减产到第十次，将停止减产。
          </p>
        </div>
        <img src="~assets/images/sheet1.png" alt="" width="100%" />
        <div class="intro-list q-ml-xs q-my-md">
          2.邀请返佣
        </div>
        <div class="intro-content q-my-md q-ml-lg">
          <p class="q-mb-sm">
            规则：每邀请一人注册并实名，并交易指定的交易对RBI/USDT，交易额满10USDT（RBI在交易时，最低交易量为100RBI）；
          </p>
          <p class="q-mb-sm">
            奖励：送邀请人30个RBI/人，只算一级邀请，邀请不设上限；
          </p>
          <p class="q-mb-sm">
            注册赠币和邀请返佣的锁仓机制：邀请返佣的币锁仓365天，每天释放1/365。
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
        POS挖矿是依据参与不同等级节点的人数按比例分配收益的。POS挖矿释放数量跟实际空投的数量有直接的关系，POS挖矿产币释放规则计算公式如下：
      </div>
      <img
        src="~assets/images/formula.png"
        alt=""
        width="285"
        height="56"
        class="q-my-md"
      />
      <p class="text-center formula">
        Sn : 第n天的释放数量；N：第几天；X: 实际空投数量； P：POS年化利率
      </p>
      <img src="~assets/images/sheet2.png" alt="" width="100%" />
      <p class="text-center formula q-mt-md" style="color:#fff;width:100%">
        分阶段开放不同等级的POS节点，每个阶段的节点收益分配比例根据实际情况调整
      </p>
      <q-markup-table
        separator="cell"
        bordered
        square
        class="intro-table intro4-table"
      >
        <thead>
          <tr>
            <th>节点等级</th>
            <th>数量</th>
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
  components: { SafeValidate, Footer },
  methods: {
    messageList() {
      // this.$router.push({ path: '/pages/message-list' })
    },
    messageDetail() {}
  }
}
</script>

<style lang="scss" scoped>
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
    padding: 15px 0;
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
