<template>
  <div>
    <!-- logo -->
    <sidebar-logo>
      <!-- logo文本插槽 -->
      <template v-slot:text>
        logo
      </template>
    </sidebar-logo>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="!isCollapse"
        :default-active="activeMenu"
        :unique-opened="false"
        background-color="#545c64"
        text-color="#fff"
        router
        active-text-color="#ffd04b">
        <sidebar-item 
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import { constantRoutes } from '@/router'
export default defineComponent({
  name: 'sideBar',
  components: {
    SidebarItem,
    SidebarLogo
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    // 控制侧边栏显示隐藏
    const isCollapse = computed(() => {
      return sidebar.value.opened
    })
    // 路由菜单
    const routes = computed(() => {
      return constantRoutes
    })
    console.log(routes, 'routes')
    // 当前激活菜单的 index
    const activeMenu = computed(() => {
      const { meta, path } = route
      if (meta !== null || meta !== undefined) {
        /**
         * @activeMenu 进入详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
         */
        if (meta.activeMenu) {
          return meta.activeMenu
        }
      }
      return path
    })
    return {
      activeMenu,
      routes,
      isCollapse
    }
  }
})
</script>
<style lang="scss">
.sidebar-container {
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    background: #545c64;
  }
  .el-menu{
    border-right:none;
    .el-menu-item-group__title{
      display:none;
    }
  }
  // 折叠卡顿
  .el-menu--collapse{
    width:100%!important;
    .el-submenu__title{
      span, .el-submenu__icon-arrow{
        display: none;
      }
    }
  }
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>