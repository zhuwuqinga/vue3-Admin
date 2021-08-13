import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const componentRouter: Array<RouteRecordRaw> = [
  {
    path: '/component',
    component: Layout,
    name: 'Component',
    meta: {
      title: '公共组件',
      icon: 'el-icon-folder-opened'
    },
    children: [
      //省市区
      {
        path: '/areaLinkDemo',
        name: 'AreaLinkDemo',
        component: () => import('@/views/areaLinkDemo.vue'),
        meta: { title: '省市区' },
      },
      //银行
      {
        path: '/bankTest',
        name: 'BankTest',
        component: () => import('@/views/bankTest.vue'),
        meta: { title: '银行' },
      },
      //请求封装
      {
        path: '/request',
        name: 'Request',
        component: () => import('@/views/request/request.vue'),
        meta: { title: '请求封装' },
      },
      //请求封装
      {
        path: '/uploadFile',
        name: 'uploadFile',
        component: () => import('@/views/uploadFile/uploadFile.vue'),
        meta: { title: '上传文件' },
      },
      //分页
      {
        path: '/pageNationDemo',
        name: 'PageNationDemo',
        component: () => import('@/views/pageNationDemo.vue'),
        meta: { title: '分页' }
      },
      //收益变更
      {
        path:'/earningChange',
        name:'earningChange',
        component:()=>import('@/views/earningChange.vue'),
        meta:{title:'收益变更'}
      }
    ],
  },
]

export default componentRouter
