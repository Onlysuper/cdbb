import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    KEEPALIVES:[''], // 缓存也name数组
    QUERY_DATA:{},// 首页搜索的内容
    HOME_TRADES:[] // 首页搜索出来的列表
  },
  mutations: {
    // 缓存页面列表
    CHANGE_KEEPALIVES(state,val) {
      state.KEEPALIVES=val
    },
    // 缓存搜索的手机号或者银行卡号
    CHANGE_QUERY (state,val) { 
      state.QUERY_DATA=val
    },
    // 缓存首页搜索出来的数据列表
    CHANGE_HOME_TRADES(state,val){
      state.HOME_TRADES=val
    }
  },
  actions: {
    CHANGE_KEEPALIVES (context,val) {
      context.commit('CHANGE_KEEPALIVES',val)
    },
    CHANGE_QUERY (context,val) {
      context.commit('CHANGE_QUERY',val)
    },
    CHANGE_HOME_TRADES (context,val) {
      context.commit('CHANGE_HOME_TRADES',val)
    }
  }
})
