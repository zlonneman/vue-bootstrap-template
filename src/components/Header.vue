<template>
  <div class="header shadow-sm">
    <div class="header__inner">
      <router-link :to="{ name: 'DashboardHome'       }"><img class="header__logo pointer" src="../assets/logo.png"></router-link>

      <div class="header__right" v-if="currentUser">
        <div class="header__right__profile--info">
          <div>{{currentUser.name}} </div>
          <div>{{ currentUser.role }}</div>
        </div>
        <i class="fa fa-cog pointer"
           @click="$router.push({ name: 'Settings' })"></i>
        <i class="fa fa-sign-out-alt pointer" @click="logout"></i>
      </div>

      <!-- <div v-if="!currentUser">
        <router-link :to="{ name: 'Login'  }" class="m-2">Login</router-link>
        <router-link :to="{ name: 'Signup' }" class="m-2">Signup</router-link>
      </div> -->

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  // import { userRoleEnum, getKeyByValue } from "../modules/helpers";

  export default {
    methods: {
      logout(){
        this.$store.dispatch('AUTH_LOGOUT');
      }
    },
    computed: {
      ...mapState(['currentUser']),
      
    }
}
</script>

<style lang="scss" scoped>
  .header{
    height: 50px;
    display: flex;
    align-items: center;
    width: 100%;
    background: $brand-green-light;
    padding-left: 20px;
    padding-right: 20px;
    &__inner {
      color: $primary;
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-width: 100%;
    }
    &__logo {
      height: 24px;
    }
    &__right{
      display: flex;
      align-items: center;

      i {
        font-size: 25px;
        margin-left: 8px;
        margin-right: 8px;
      }
      &__profile--info {
        font-size: .8em;
        display: flex;
        align-items: flex-end;
        padding-right: 25px;
        flex-direction: column;
      }
    }
    
  }
  
</style>
