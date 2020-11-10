import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '../views/Layout.vue';
import Home from '../views/Home.vue';

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'DashboardHome',
  //   component: Layout
  // },
  {
    path: '/',
    name: 'DashboardHome',
    component: Layout,
    redirect: { name: 'Home' },

    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
