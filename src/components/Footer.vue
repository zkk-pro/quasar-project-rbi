<template>
  <div class="footer-box flex justify-center items-center">
    <img src="~assets/images/footer-logo.png" alt="logo" />
    <span>人人都能得到无风险基本收入RBI</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footer-box {
  height: 80px;
  background: #161934;
  & > img {
    width: 82px;
    height: 42px;
  }
  & > span {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.4);
    margin-left: 16px;
  }
}
</style>
