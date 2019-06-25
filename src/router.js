import Vue from 'vue'
import store from './store';
import Router from 'vue-router'
import Home from './views/Home.vue'
import History from './views/History.vue'
import BackDetail from './views/BackDetail.vue'
import RentDetail from './views/RentDetail.vue'
import AddCard from './views/AddCard.vue'
import AddPhone from './views/AddPhone.vue'
import AddCardPhone from './views/AddCardPhone.vue'

Vue.use(Router)
const routerObj={
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/backdetail',
      name: 'backdetail',
      component: BackDetail,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/rentdetail',
      name: 'rentdetail',
      component: RentDetail,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/addcard',
      name: 'addcard',
      component: AddCard,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/addcardphone',
      name: 'addcardphone',
      component: AddCardPhone,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/addphone',
      name: 'addphone',
      component: AddPhone,
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
}
const router = new Router(routerObj)
const keepAlives = routerObj['routes'].map(item=>{
  if(item.meta.keepAlive){
    return item.name
  }
})
// console.log(keepAlives);
router.beforeEach((to, redirect, next) => {
  if(redirect.name=='home'||!redirect.name){
    store.dispatch('CHANGE_KEEPALIVES',[]).then((res) => { 
      next()
    }).catch(() => {
      next()
    })
    // store.commit('CHANGE_KEEPALIVES', []);
  }else{
    // console.log(redirect);
    store.dispatch('CHANGE_KEEPALIVES',[...keepAlives]).then((res) => { 
      next()
    }).catch(() => {
      next()
    })
    // store.commit('CHANGE_KEEPALIVES', [keepAlives]);
  }
 
})
export default router;