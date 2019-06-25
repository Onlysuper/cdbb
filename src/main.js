import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant'
import { Field } from 'vant';
import { Tab, Tabs } from 'vant';
import mFilter from '@src/common/js/filters';
import VueScroller from 'vue-scroller'
Vue.use(mFilter);
// Vue.use(Vant);
Vue.use(Field);
Vue.use(Toast);
Vue.use(VueScroller);

Vue.use(Tab).use(Tabs);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
