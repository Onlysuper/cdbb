import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import History from './views/History.vue'
import BackDetail from './views/BackDetail.vue'
import RentDetail from './views/RentDetail.vue'
import AddCard from './views/AddCard.vue'
import AddPhone from './views/AddPhone.vue'
import AddCardPhone from './views/AddCardPhone.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/backdetail',
      name: 'backdetail',
      component: BackDetail
    },
    {
      path: '/rentdetail',
      name: 'rentdetail',
      component: RentDetail
    },
    {
      path: '/addcard',
      name: 'addcard',
      component: AddCard
    },
    {
      path: '/addcardphone',
      name: 'addcardphone',
      component: AddCardPhone
    },
    {
      path: '/addphone',
      name: 'addphone',
      component: AddPhone
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
})
