<template>
  <div>
    <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      :clearable="true"
      :value-key="valueKey"
      :style="{ width: width }"
      :disabled="disabled"
      :placeholder="placeholder"
      @select="handleSelect"
    ></el-autocomplete>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onUpdated, computed, watch } from 'vue'
export default defineComponent({
  props: {
    // 银行列表
    data: {
      type: Array,
      required: true,
      defalut: () => {
        return []
      },
    },
    // 输入框长度
    width: {
      type: String,
      required: false,
      default: () => {
        return '300px'
      },
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      required: false,
      default: () => {
        return false
      },
    },
    // 输入建议对象中用于显示的键名
    valueKey: {
      type: String,
      required: true,
      default: () => {
        return 'bankName'
      },
    },
    // 输入框提示信息
    placeholder:{
      type:String,
      required:false,
      default:()=>{
        return '请输入银行名称'
      }
    }
  },
  setup(props: any, context: any) {
    // 父组件传值
    let restaurants: Array = reactive([])
    
    // 监听父组件传入的值
    watch(
      props,
      (newQuestion, oldQuestion) => {
        restaurants = newQuestion.data
      },
      { deep: true }
    )

    let timeout: number | undefined
    // 返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
    const querySearchAsync = (queryString: any, cb: any) => {
      var results = queryString
        ? restaurants.filter(createFilter(queryString))
        : restaurants

      clearTimeout(timeout)
      timeout = setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    }
    // 模糊搜索
    const createFilter = (queryString: string) => {
      return (restaurant: { bankName: string }) => {
        return (
          restaurant.bankName
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        )
      }
    }
    // 选中之后触发
    const handleSelect = (item: any) => {
      context.emit('handleSelect', item)
    }
    return {
      restaurants,
      state: ref(''),
      querySearchAsync,
      createFilter,
      handleSelect,
    }
  },
})
</script>
