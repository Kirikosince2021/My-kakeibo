import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    namespaced: true,
    state: {
      currentUser: null
    },
    getters: {
      currentUser: (state) => state.currentUser
    },
    mutations: {
      setCurrentUser(state, user) {
        state.currentUser = user
      }
    },
    actions: {},
    plugins: [
      createPersistedState({
        storage: window.sessionStorage
      }),
    ]
  })
}
export default createStore