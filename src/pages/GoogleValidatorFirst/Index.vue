<template>
  <q-page class="column items-center">
    <div class="google-validator">
      <img
        src="~assets/images/google-validator.png"
        class=""
        alt=""
      />
    </div>
    <p class="text">
      谷歌验证器是一款动态口令工具，工作原理类
      似短信动态验证。当您开启谷歌验证之后，将
      优先使用谷歌验证代替短信/邮箱验证。
    </p>
    <q-btn
      class="full-width"
      rounded
      color="primary"
      text-color="dark"
      label="立即开启"
      style="max-width: 315px; height:46px; margin-top:80px;font-weight: bold"
      replace
      to="/g-validator"
    />
  </q-page>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.google-validator {
  width: 106px;
  height: 106px;
  margin-top: 62px;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.text {
  padding: 0 46px;
  line-height: 22px;
  text-align: center;
  margin-top: 16px;
}
@media screen and (min-width: 599px) {
  .text{
    width: 410px;
    padding: 0 0;
  }
}
</style>
