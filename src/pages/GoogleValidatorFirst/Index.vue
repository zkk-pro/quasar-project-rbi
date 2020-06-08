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
      {{$t('googel_validator')}}
    </p>
    <q-btn
      class="full-width"
      rounded
      no-caps
      color="primary"
      text-color="dark"
      :label="$t('googel_open')"
      style="max-width: 315px; height:46px; margin-top:80px;font-weight: bold"
      to="/g-validator"
      replace
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
