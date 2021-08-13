<template>
  <div class="nav-bar">
    <i
      :class="[sidebar.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold', 'toggle-icon']"
      @click="toggleSideBar"
    ></i>
    <BreadCrumb />
    <div class="right-menu">
      <el-dropdown trigger="click">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="home">主页</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, reactive, toRefs } from 'vue'
import BreadCrumb from './BreadCrumb.vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
export default defineComponent({
  name: 'Navbar',
  components: {
    BreadCrumb
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const sidebar = computed(() => {
      return store.state.app.sidebar
    })
    const state = reactive({
      // 控制侧边栏显示隐藏
      toggleSideBar: () => {
        store.dispatch('app/toggleSideBar')
      },
      // 退出
      logout: () => {
        console.log('退出')
      },
      // 首页
      home: () => {
        router.push({path: '/index'})
      }
    })
    return {
      sidebar,
      ...toRefs(state)
    }
  }
})
</script>
<style scoped lang='scss'>
  .nav-bar{
    height:60px;
    line-height: 60px;
    overflow: hidden;
    position: relative;
  }
  .toggle-icon{
    font-size: 20px;
    cursor: pointer;
    margin:0 15px;
  }
  .right-menu {
    float: right;
    img{
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin:10px 10px 0 0;
    }
  }
</style>