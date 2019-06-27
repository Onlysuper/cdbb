import Vue from 'vue'
import store from './store';
import Router from 'vue-router'
import Home from './views/Home.vue'
import storage from "@src/common/js/storage.js"

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
      component: () => import(/* webpackChunkName: "History" */ './views/History.vue'),
      meta: {
        keepAlive: true // 不需要缓存
      }
    },
    {
      path: '/backdetail',
      name: 'backdetail',
      component: () => import(/* webpackChunkName: "BackDetail" */ './views/BackDetail.vue'),
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/rentdetail',
      name: 'rentdetail',
      component: () => import(/* webpackChunkName: "RentDetail" */ './views/RentDetail.vue'),
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/addcard',
      name: 'addcard',
      component: () => import(/* webpackChunkName: "AddCard" */ './views/AddCard.vue'),
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/addcardphone',
      name: 'addcardphone',
      component: () => import(/* webpackChunkName: "AddCardPhone" */ './views/AddCardPhone.vue'),
      meta: {
        keepAlive: false // 不需要缓存
      }
    },
    {
      path: '/addphone',
      name: 'addphone',
      component: () => import(/* webpackChunkName: "AddPhone" */ './views/AddPhone.vue'),
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