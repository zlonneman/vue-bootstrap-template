<template>
  <div id="app">
    <router-view />
    <notification-queue />
    <loading-modal />
  </div>
</template>
<script>
import Layout        from './views/Layout';
import { NotificationQueue, LoadingModal } from '@/components';
export default {
  components:{
    Layout,
    NotificationQueue,
    LoadingModal,
  },
};
</script>

<style lang="scss">
@import "./assets/custom_bootstrap";


  #app {
    font-family: $font-family-base;
    font-weight: $font-weight-base;
    background-color: $brand-brown-bg;
    height: 100vh;
  }
  body, html {
    color: $brand-grey-1;
    background: $brand-brown-bg;
  }
</style>
