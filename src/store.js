import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    KEEPALIVES:[''],
    SEARCHVAL:'',
  },
  mutations: {
    // 缓存页面列表
    CHANGE_KEEPALIVES(state,val) {
      // console.log(val);
      state.KEEPALIVES=val
    },
    CHANGE_SEARCHVAL (state,val) {
      // console.log(val);
      state.SEARCHVAL=val
    }
  },
  actions: {
    // 缓存页面列表
    CHANGE_KEEPALIVES (context,val) {
      context.commit('CHANGE_KEEPALIVES',val)
    },
    CHANGE_SEARCHVAL (context,val) {
      context.commit('CHANGE_SEARCHVAL',val)
    }
  }
})
