import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    KEEPALIVES:[''],
    QUERY_DATA:{},// 搜索的内容
  },
  mutations: {
    // 缓存页面列表
    CHANGE_KEEPALIVES(state,val) {
      // console.log(val);
      state.KEEPALIVES=val
    },
    CHANGE_QUERY (state,val) { // 缓存搜索的手机号或者银行卡号
      // console.log(val);
      state.QUERY_DATA=val
    }
  },
  actions: {
    // 缓存页面列表
    CHANGE_KEEPALIVES (context,val) {
      context.commit('CHANGE_KEEPALIVES',val)
    },
    CHANGE_QUERY (context,val) {
      context.commit('CHANGE_QUERY',val)
    }
  }
})
