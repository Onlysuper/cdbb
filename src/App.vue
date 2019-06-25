<template>
  <div id="app">
     <!-- <view>{{KEEPALIVES}}</view> -->
    <keep-alive :include="KEEPALIVES">
      <router-view></router-view>
    </keep-alive>
    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
  </div>
</template>

<style lang="scss">
#app{
  margin:0;
  padding: 0;
}
</style>

<script>
import { mapState, mapActions } from "vuex";
import "@src/common/js/media.js"
export default {
   computed: {
    ...mapState({
      KEEPALIVES: state => state.KEEPALIVES,
    })
  },
}
</script>

