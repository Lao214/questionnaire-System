import Vue from 'vue'

import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/build',
    component: () => import('@/views/Kdesign/build'),
    hidden: true
  },
  {
    path: '/logic',
    component: () => import('@/views/logic/logic'),
    hidden: true
  },
  {
    path: '/editEvaluatePhone',
    component: () => import('@/views/logic/evaluateEditPhone'),
    hidden: true
  },
  {
    path: '/editEvaluatePC',
    component: () => import('@/views/logic/evaluateEditPC'),
    hidden: true
  },
  {
    path: '/evaluatePC',
    component: () => import('@/views/evaluate/evaluate'),
    hidden: true
  },
  {
    path: '/kndex',
    component: () => import('@/views/Kdesign/k'),
    hidden: true
  },
  {
    path: '/publish',
    component: () => import('@/views/publish/index'),
    hidden: true
  },
  {
    path: '/formData',
    component: () => import('@/views/data/index'),
    hidden: true
  },
  {
    path: '/statistics',
    component: () => import('@/views/statistics/index'),
    hidden: true
  },
  {
    path: '/edit/:id',
    component: () => import('@/views/Kdesign/k'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },


  {
    path: '/forms',
    component: Layout,
    name: '表单',
    meta: { title: '表单', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'DesignList',
        component: () => import('@/views/Kdesign/list'),
        meta: { title: '列表', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
