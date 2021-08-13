<template>
  <div class="sidebar-logo-container">
    <!-- 图片插槽 -->
    <slot name="img"></slot>
    <!-- 文本插槽 -->
    <slot name="text"></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarLogo',
  setup () {

  }
})
</script>
<style scoped lang='scss'>
.sidebar-logo-container{
  width: 100%;
  height: 50px;
  line-height:50px;
  text-align:center;
  background:#f4ad61;
}
</style>