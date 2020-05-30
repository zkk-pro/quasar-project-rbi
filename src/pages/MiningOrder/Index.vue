<template>
  <q-page>
    <div class="row justify-center">
      <Breadcrumb class="col-xs-11"/>
    </div>
    <router-view></router-view>
  </q-page>
</template>

<script>
import Breadcrumb from 'components/Breadcrumb'
export default {
  components: { Breadcrumb }
}
</script>

<style lang="scss" scoped></style>
