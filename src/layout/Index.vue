<!--
 * @Description: app 布局入口
-->
<template>
  <div class="app-wrapper" :class="!sidebar.opened ? 'hideSidebar' : ''">
    <Sidebar class="sidebar-container" />
    <div class="main-container">
      <Navbar />
      <TagsView />
      <AppMain />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { AppMain, Sidebar, Navbar, TagsView } from './components'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Layout',
  components: {
    AppMain,
    Sidebar,
    Navbar,
    TagsView
  },
  setup () {
    const store = useStore()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    return {
      sidebar
    }
  }
})
</script>

<style lang="scss" scoped>
$sideBarWidth: 212px;
.sidebar-container {
  transition: all 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.main-container {
  min-height: 100%;
  transition: all 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}
.hideSidebar {
  .main-container {
    margin-left: 54px;
  }
  .sidebar-container {
    width: 54px !important;
  }
}
</style>
