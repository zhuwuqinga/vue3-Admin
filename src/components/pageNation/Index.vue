<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-config-provider :locale="locale">
      <el-pagination
        :total="total"
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size.sync="limit"
        :layout="layout"
        :background="background"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
</template>
<script lang="ts">
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'PageNation',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
  },
  props: {
    // 总条目数 -- 必传
    total: {
      required: true,
      type: Number,
    },
    // 当前页数
    page: {
      type: Number,
      default: 1,
    },
    // 每页显示条目个数
    limit: {
      type: Number,
      default: 10,
    },
    // 每页显示个数选择器
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30]
      },
    },
    // 组件布局
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    // 是否为分页按钮添加背景色
    background: {
      type: Boolean,
      default: true,
    },
    // 是否使用小型分页样式
    small: {
      type: Boolean,
      default: false,
    },
    // 是否显示组件
    hidden: {
      type: Boolean,
      default: false,
    },
    // autoScroll: {
    //   type: Boolean,
    //   default: true,
    // },
  },
  setup(props, ctx) {
    // 定义本组件所需的参数/方法接口 -- ts
    interface dataProps {
      limit: Number
      page: Number
      locale: any
      handleSizeChange: (val: Number) => void
      handleCurrentChange: (val: Number) => void
    }
    // 定义本组件所需的响应式数据/方法 -- vue3 -- reactive
    const data: dataProps = reactive({
      // 每页显示条目数量
      limit: props.limit,
      locale: zhCn,
      page: props.page,
      // pageSize 改变时会触发
      handleSizeChange: (val: Number) => {
        data.limit = val
        ctx.emit('pagination', { page: data.page, limit: val })
      },
      // currentPage  改变时会触发
      handleCurrentChange: (val: Number) => {
        data.page = val
        ctx.emit('pagination', { page: val, limit: data.limit })
      },
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  text-align: right;
}
.pagination-container.hidden {
  display: none;
}
</style>
