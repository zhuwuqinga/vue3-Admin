<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <el-menu-item
        :index="theOnlyOneChild.path"
      >
        <template #title>
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="theOnlyOneChild.meta.title">{{theOnlyOneChild.meta.title}}</span>
        </template>
      </el-menu-item>
    </template>
    <el-submenu
      v-else
      :index="item.path"
    >
      <template #title>
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span v-if="item.meta && item.meta.title">{{item.meta.title}}</span>
      </template>
      <template v-if="item.children">
        <!-- 组件递归 -->
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="child.path"
          :is-collapse="isCollapse"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script lang='ts'>
import path from 'path'
import { defineComponent, PropType, computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<RouteRecordRaw>,
      required: true
    },
    // 父级path
    basePath: {
      type: String,
      required: true
    },
    isCollapse: {
      type: Boolean,
      required: false
    }
  },
  setup (props) {
    /**
     * @alwaysShow : true，这样它就会忽略之前定义的规则，一直显示根路由
     */
    const alwaysShowRootMenu = computed(() => {
      if (props.item.meta && props.item.meta.alwaysShow) {
        return true
      } else {
        return false
      }
    })
    /**
     * @hidden 侧边栏是否显示
     * 过滤掉侧边栏不显示的菜单
     */
    const showingChildNumber = computed(() => {
      if (props.item.children) {
        const showingChildren = props.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    })
    /**
     * 获取只有单个子菜单的路由数据，比如首页
     * 侧边栏一级显示
     */
    const theOnlyOneChild = computed(() => {
      if (showingChildNumber.value > 1) {
        return null
      }
      if (props.item.children) {
        for (const child of props.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      return { ...props.item}
    })
    // const resolvePath = (routePath: string) => {
    //   return path.resolve(props.basePath, routePath)
    // }
    return {
      alwaysShowRootMenu,
      theOnlyOneChild
    }
  }
})
</script>
<style scoped lang='scss'>
</style>