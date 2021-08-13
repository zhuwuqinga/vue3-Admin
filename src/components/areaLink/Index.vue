/* * @Author: zhuwuqing * @Date: 2021-07-26 12:08:03 * @Last Modified by:
zhuwuqing * @Last Modified time: 2021-07-26 14:54:13 */
<template>
  <div class="linkage" :style="`width:${width}px`">
    <div>
      <!-- 省组 start -->
      <el-select
        v-model="model.provinceCode"
        :filterable="filterable"
        :size="size"
        :disabled="disabled"
        placeholder="请选择省份"
        @change="selectProvinceFun($event)"
      >
        <el-option value="" label="请选择省份" />
        <el-option
          v-for="(item, index) in provinceList"
          :key="index"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </div>
    <!-- 省组 end -->

    <!-- 市组 start -->
    <div>
      <el-select
        v-model="model.cityCode"
        :filterable="filterable"
        :size="size"
        :disabled="disabled"
        placeholder="请选择城市"
        @change="selectCityFun($event)"
      >
        <el-option value="" label="请选择城市" />
        <el-option
          v-for="(item, index) in cityList"
          :key="index"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </div>
    <!-- 市组 end -->

    <!-- 区/县组 start -->
    <div v-show="showArea">
      <el-select
        v-model="model.areaCode"
        :filterable="filterable"
        :size="size"
        :disabled="disabled"
        placeholder="请选择区县"
        @change="selectAreaFun($event)"
      >
        <el-option value="" label="请选择区县" />
        <el-option
          v-for="(item, index) in areaList"
          :key="index"
          :value="item.value"
          :label="item.label"
        />
      </el-select>
    </div>
    <!-- 区/县组 end -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, onMounted } from 'vue'
import city from './city.json' //获取静态地区资源

export default defineComponent({
  name: 'AeraLink',
  props: {
    // 省市区回显 -- 父组件入参：省市区code
    araeSelectData: {
      type: Object,
      default() {
        return {
          provinceCode: '',
          cityCode: '',
          areaCode: '',
        }
      },
    },
    // 是否显示区组
    showArea: {
      type: Boolean,
      default: true,
    },
    // 是否开启选择框搜索
    filterable: {
      type: Boolean,
      default: false,
    },
    // 是否禁用组件
    disabled: {
      type: Boolean,
      default: false,
    },
    // 组件尺寸
    size: {
      type: String,
      default: 'small',
    },
    // 组件宽度
    width: {
      type: Number,
      default: 400,
    },
  },
  setup(props, ctx) {
    // 定义本组件所需的参数/方法接口 -- ts
    interface dataProps {
      model: {
        provinceCode: String
        cityCode: String
        areaCode: String
      }
      provinceList: Object[]
      cityList: Object[]
      areaList: Object[]
      selectProvinceFun: (event: String) => void
      selectCityFun: (event: String) => void
      selectAreaFun: (event: String) => void
    }
    // 定义本组件所需的响应式数据/方法 -- vue3 -- reactive
    const data: dataProps = reactive({
      // 接收并存储父组件传进来的省市区code -- 便于后期修改
      model: props.araeSelectData, 
      // 省资源列表
      provinceList: city, 
      // 市资源列表
      cityList: [], 
      // 区/县资源列表
      areaList: [], 
      // 选择省
      selectProvinceFun: (event: String) => {
        if (event) {
          data.provinceList.forEach((i) => {
            if (i.value == event) {
              data.cityList = i.children
              return false
            }
          })
        } else {
          data.cityList = []
        }
        data.areaList = []
        data.model.cityCode = ''
        data.model.areaCode = ''
      },
      // 选择市
      selectCityFun: (event: String) => {
        if (event) {
          if (props.showArea) {
            data.cityList.forEach((i) => {
              if (i.value == event) {
                data.areaList = i.children
                return false
              }
            })
          } else {
            ctx.emit('onChange', data.model)
          }
        } else {
          data.areaList = []
        }
        data.model.areaCode = ''
      },
      // 选择区/县
      selectAreaFun: (event: String) => {
        ctx.emit('onChange', data.model)
      },
    })

    onMounted(() => {
      // 判断父组件入参是否含有省id -- 有则获取市资源列表
      if (props.araeSelectData.provinceCode) {
        data.provinceList.forEach((i) => {
          if (i.value == props.araeSelectData.provinceCode) {
            data.cityList = i.children
            return false
          }
        })
      }
      // 判断父组件入参是否含有市id -- 有则获取区/县资源列表
      if (props.araeSelectData.cityCode) {
        data.cityList.forEach((i) => {
          if (i.value == props.araeSelectData.cityCode) {
            data.areaList = i.children
            return false
          }
        })
      }
    })

    return {
      ...toRefs(data),
    }
  },
})
</script>
<style lang="scss" scoped>
.linkage {
  display: flex;
  div {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
}
</style>
