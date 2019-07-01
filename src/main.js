import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast,Field,Tab, Tabs,NumberKeyboard,Popup } from 'vant'
// import { Toast,Field } from 'vant'
import mFilter from '@src/common/js/filters';
import VueScroller from 'vue-scroller'
Vue.use(mFilter);
Vue.use(VueScroller);
Vue.use(Tab).use(Tabs).use(Toast).use(Field).use(NumberKeyboard).use(Popup);
Vue.use(Toast).use(Field);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
