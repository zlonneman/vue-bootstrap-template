<template>
  <div class="layout-wrapper">
    <Header />
    
    <main class="layout-main">
      <Sidebar />
      <div class="layout-router-view">
        <router-view/>
      </div>
      
    </main>
  </div>
</template>
<script>
import Sidebar from '../components/Sidebar';
import Header from '../components/Header'
export default {
  components:{
    Header,
    Sidebar,
  },
  
};
</script>

<style lang="scss">
  .layout-wrapper {
    min-height: 100%;
    background: $brand-brown-bg-light;

    .layout-main {
      height: calc(100vh - 50px);
      display: flex;
    }
    .layout-router-view {
      width: 100%;
      overflow: scroll;
      padding: 15px 30px;
    }
  }
</style>
