<template>
  <div class="sidebar shadow-sm p-2 m-0">
      <router-link :to="{ name: 'DashboardHome'       }"><i class="fa fa-home" title="home" aria-hidden="true"></i></router-link>

      <!-- <template v-if="can('access-admin-sidebar')">
          <router-link :to="{ name: 'ManufacturerSearch'  }"><i class="fa fa-tools" title="Manufacturer Search" aria-hidden="true"></i></router-link>
          <router-link :to="{ name: 'DealerSearch'        }"><i class="fa fa-building" title="Dealer Search" aria-hidden="true"></i></router-link>
          <router-link :to="{ name: 'CustomerSearch'      }"><i class="fa fa-handshake" title="Customer Search" aria-hidden="true"></i></router-link>
          <router-link :to="{ name: 'CoworkerSearch'      }"><i class="fa fa-users" title="Coworker Search" aria-hidden="true"></i></router-link>
          <router-link :to="{ name: 'ProductSearch'       }"><i class="fa fa-file" title="Product Search" aria-hidden="true"></i></router-link>
          <router-link :to="{ name: 'AdminUsers'          }"><i class="fa fa-user-plus" title="Admin Management" aria-hidden="true"></i></router-link>
      </template> -->
  </div>
</template>

<script>

    export default {
      data: () => {
         return {
         }
      },
      methods: {
          
      },
    }
</script>

<style lang="scss" scoped>
  .sidebar{
    min-width: 50px;
    max-width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;
    background-color: $brand-green-extra-light;
    i{
      font-size: 24px;
    }
  }
</style>
