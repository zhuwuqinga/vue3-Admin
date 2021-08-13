import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Index.vue'
import componentRouter from './component'

const routes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/Index.vue')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      icon: 'el-icon-s-home'
    },
    children: [
      {
        path: '/index',
        component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue'),
        name: 'Index',
        meta: {
          title: '首页',
          affix: true
        }
      }
    ]
  },
  ...componentRouter
]

export const constantRoutes: Array<RouteRecordRaw> = [
  ...routes
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
