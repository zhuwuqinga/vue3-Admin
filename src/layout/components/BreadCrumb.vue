<template>
  <el-breadcrumb
  class="bread-crumb"
  separator-class="el-icon-arrow-right"
>
  <transition-group name="breadcrumb">
    <el-breadcrumb-item
      v-for="item in breadcrumbs"
      :key="item.path"
    >
      <span>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </transition-group>
</el-breadcrumb>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, onBeforeMount } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
export default defineComponent({
  name: 'BreadCrumb',
  setup () {
    const currentRoute = useRoute()
    const state = reactive({
      breadcrumbs: [] as Array<RouteLocationMatched>,
      getBreadcrumb: () => {
        let matched = currentRoute.matched.filter((item) => item.meta && item.meta.title)
        state.breadcrumbs = matched.filter((item) => {
          return item.meta && item.meta.title
        })
      }
    })
    // 监听路由的变化
    watch(() => currentRoute.path, (path) => {
      state.getBreadcrumb()
    })
    // 首次加载
    onBeforeMount(() => {
      state.getBreadcrumb()
    })
    return {
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang='scss'>
.bread-crumb{
  display:inline-block;
}
</style>