import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
// import trans from '@/components/temp/transition'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
    // {
    //   path: '/trans',
    //   name: 'trans',
    //   component: trans
    // }
  ]
})
