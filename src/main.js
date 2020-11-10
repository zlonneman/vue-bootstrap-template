
import Vue       from 'vue';
import App       from './App.vue';
import router    from './router';
import store     from './store';
import axios     from 'axios';
import mixins    from './mixins.js';
import {
  TextInput,
  Autocomplete,
  Combobox,
  Dropdown,
  DataTable
} from '@/components'

import 'bootstrap';

Vue.config.productionTip = false

let componentsArray = [
  TextInput,
  Autocomplete,
  Combobox,
  Dropdown,
  DataTable,
]
// Globally Registering these base components so we don't have to import them into every view/component
// Just make sure you reference them as.. ex: <TextInput />  or  <-text-input />
componentsArray.forEach(c => {
  //looping through every component
  Vue.component(`${c.name}`, c);
})

new Vue({
  router,
  store,
  mixins: mixins,
  render: function (h) { return h(App) }
}).$mount('#app')

axios.interceptors.request.use(config => {
  store.commit('ADD_REQUEST');
  return config;
},  (err) => {
  store.commit('REMOVE_REQUEST');
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  store.commit('REMOVE_REQUEST');
  return response;
},(err) => {
  store.commit('REMOVE_REQUEST');
  if (err.response.status === 403 || err.response.status === 401 ) {
    if(err.response.status === 403){
      store.dispatch('ADD_NOTIFICATION', { text: "You were logged off because your account is being used elsewhere", type: 'error' });
    }
    
    store.dispatch('AUTH_LOGOUT');
  };
  return Promise.reject(err);
});

