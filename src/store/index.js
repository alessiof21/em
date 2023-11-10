import { createStore } from 'vuex'

export default createStore({
  state: function() {
    return {
      cache: []
    }
  },
  getters: {
  },
  mutations: {
    cached(state, list) {
      state.cache = list.slice(0);
    }
  },
  actions: {
  },
  modules: {
  }
})
