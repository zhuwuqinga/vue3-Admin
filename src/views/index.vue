<template>
  <div>
    <el-card>
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary" @click="navAreaLink"
          >测试省市区组件入口</el-button
        >
        <el-button type="primary" @click="navPagination"
          >测试分页组件入口</el-button
        >
        <el-button type="success" @click="bank">银行支行入口</el-button>
        <el-button type="info" @click="earningChange">收益变更</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    let navAreaLink = () => {
      router.push({ path: '/areaLinkDemo' })
    }
    let navPagination = () => {
      router.push({ path: '/pageNationDemo' })
    }
    let bank = () => {
      router.push({ path: '/bankTest' })
    }
    let earningChange = () =>{
      router.push({ path:'/earningChange'})
    }
    return {
      navAreaLink,
      navPagination,
      bank,
      earningChange
    }
  },
})
</script>
