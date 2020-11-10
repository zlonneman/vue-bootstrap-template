import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notificationItems: [],
    openRequestCount: 0,
    currentUser: {name: 'Zach', role: 'Admin'},
    token: null,
  },
  mutations: {
    SET_NOTIFICATION_ITEM(state, message){
      state.notificationItems.push(message);
    },
    DELETE_NOTIFICATION_ITEM(state, notificationId){
        let itemIndex = state.notificationItems.findIndex(item => item.id === notificationId);
        state.notificationItems.splice(itemIndex,1);
    },
    ADD_REQUEST(state){
      state.openRequestCount++;
    },
    REMOVE_REQUEST(state){
      state.openRequestCount--;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, user){
      state.currentUser = user;
    },
  },
  actions: {
    ADD_NOTIFICATION({ commit, dispatch }, messageInfo){
      let timeout = messageInfo.timeout || 6000;
      let id = Math.random().toString(36).substring(2) + Date.now().toString(36);
      let message = { ...messageInfo, timeout, id };
      commit('SET_NOTIFICATION_ITEM', message);
      setTimeout(() => {
        dispatch('REMOVE_NOTIFICATION', message.id);
      }, message.timeout);
    },
    REMOVE_NOTIFICATION({ commit }, notificationId){
      commit('DELETE_NOTIFICATION_ITEM', notificationId);
    },
    SET_TOKEN({commit, dispatch}, token) {
      return new Promise( (resolve,reject) => {
          commit('SET_TOKEN', token);
          addTokenToAxiosHeaders(token.access_token);
          localStorage.setItem('token', JSON.stringify(token));
          dispatch('GET_CURRENT_USER').then(res => {
            resolve();
          }).catch(err => {
            reject();
          });
      });
    },
    GET_CURRENT_USER({commit}){
      return new Promise( (resolve, reject) => {
          Auth.currentUser().then(user => {
            console.log('UserService user', user);
            commit('SET_USER', user);
            resolve();
          }).catch(err => {
            console.error(err);
            reject();
          });
      });
    },
    AUTH_LOGOUT({commit}){
      // basically, no matter if the backend successfully invalidates the token, clear
      // token from memory state and redirect to login page.
      Auth.logout().finally(() => {
        commit('SET_TOKEN', null);
        commit('SET_USER', {});
        localStorage.removeItem('token');
        removeTokenFromAxiosHeaders();
        router.push({name:'VisitorHome'});
      });
    }
  }
})

function addTokenToAxiosHeaders(access_token) {
   axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

function removeTokenFromAxiosHeaders() {
   delete axios.defaults.headers.common['Authorization'];
}
