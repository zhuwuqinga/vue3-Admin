# 请求文档

## 目录

├─layout
│ │ Index.vue --- 布局入口
│ │ sideBar/Index.vue ---侧边栏
│ │ sideBar/SidebarItem.vue ---侧边栏 item 定制，需要单独抽出来，多级路由嵌套需要它来递归
│ │ sideBar/SidebarLogo.vue ---logo
│ │ AppMain ---主视图
│ ├─BreadCrumb ---面包屑
│ └─tagsView ---tags

```

| 参数         | 说明                      | 参数数据类型 | 是否必填 | 可选参数                                             | 默认值 |
| ------------| ----------------------    | ------------ | -------- | ---------------------------------------------------| ------|
| hidden      | 控制是否在侧边栏显示        |  Boolean     | 否       |                                                    | false |
| activeMenu  | 进入详情页面指定侧边栏的高亮 |  String      |  否      |                                                    | -     |
| icon        | 侧边栏图标                 |  String      |  否      |                                                     | -     |
| affix       | 固定在tags-view中          |  Boolean     |  否      |                                                     | false |
| noCache     | <keep-alive> 缓存          |  Boolean     |  否      |                                                     | false |
| alwaysShow  | 是否显示根路由              |  Boolean     |  否      |                                                     | -     |

```

## 示例

```ts
{
  path: '/permission',
  component: Layout,
  meta: { hidden: true }, // hidden当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
  children: [{
    path: 'index',
    component: ()=>import('permission/index'),
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'el-icon-folder-opened', // 侧边栏图标，现在取的是element icon图标
      noCache: true, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      activeMenu: '/article/list', // 进入详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
      affix: true, // 如果设置为true，它则会固定在tags-view中(默认 false)
      alwaysShow: true // 侧边栏就会忽略之前定义的规则，一直显示根路由
    }
  }]
}

// 侧边栏是获取路由表里面的数据，layout/components/sideBar/Index 中的routes获取对应的路由表数据

```

## tags 组件注意要点

```ts
layout/components/tagsView
// 功能模块 1、刷新 2、关闭 3、关闭其它 4、关闭所有

/**
 * 通过监听 useRoute 路由的变化新增 @method addTags
 * 涉及store，具体可以查看 store/modules/tagsView.ts
 */

/**
 * @method refreshSelectedTag 刷新，重定向到一个新的页面/redirect，然后跳转回来完成刷新
 */
// 1、刷新当前页
router/index.ts

  // tags右键刷新重定向
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
  }
  views/redirect

/**
 * @method closeSelectedTag 关闭
 */

/**
 * @method closeOthersTags 关闭其它
 */

/**
 * @method closeAllTags 关闭所有
 */

```

## SidebarLogo 组件注意要点

```ts
// 包含图片插槽和文本插槽，如果是图片文本插槽的话需要父组件修改样式

// logo图片插槽
<template v-slot:img>
  <img src="" alt="">
</template>

// logo文本插槽
<template v-slot:text>
  logo
</template>

```

## 遗留的问题

```ts
// 问题1：
import path from 'path'
/**
 * 父子路由拼接这个方法报错，暂时不知道是什么原因，导致当前url只有一级路由
 * 涉及地方：
 * 1、layout/components/sideBar/SidebarItem 中的 @method resolvePath
 * 本来涉及el-menu-item index跳转的用法是 resolvePath(item.path)
 *
 * 2、layout/components/tagsView/index 中的 @method filterAffixTags
 */
path.resolve()

// 问题2
// 监听路由的时候会有这样的警告，也就是切换菜单的时候
//  Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.
```
