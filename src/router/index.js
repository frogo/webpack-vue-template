import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue')
    },
    {
      path: '/convention',
      component: () => import('../views/convention.vue')
    }
  ]
})
//  导航守卫
router.beforeEach((to, from, next) => {
  // ...
  next()
})

export default router
