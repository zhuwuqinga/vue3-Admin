<template>
  <div>
    <el-row class="bank_row">
      <h3>银行组件</h3>
    </el-row>
    <el-row class="bank_row">
      <Bank
        @handleSelect="handleSelect"
        :data="bankArray"
        :width="width"
        :disabled="disabled"
        :valueKey="valueKey"
      ></Bank>
    </el-row>
    <el-row class="bank_row">
      <h3>我选中的:{{ bankName }}</h3>
    </el-row>
    <el-row class="bank_row">
      <h3>省市区</h3>
    </el-row>
    <el-row class="bank_row">
      <AreaLink
        :araeSelectData="araeSelectData"
        @onChange="onChange"
        :showArea="false"
      ></AreaLink>
    </el-row>
    <el-row class="bank_row">
      <h3>支行</h3>
    </el-row>
    <el-row class="bank_row">
      <Bank
        @handleSelect="handleSubSelect"
        :data="subBankArray"
        :width="width"
        :disabled="disabled"
        :valueKey="valueKey"
        :placeholder="placeholderSub"
      ></Bank>
    </el-row>
    <el-row class="bank_row">
      <h3>我选中的:{{ subBankName }}</h3>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import Bank from '../components/bank/Bank.vue'
import AreaLink from '../components/areaLink/Index.vue'
import api from '@/server/api/test'
interface DataProps {
  bankArray: Array<any>
  subBankArray: Array<any>
  bankCode: number
  cityCode: number
  bankName: string
  subBankName: string
}
export default defineComponent({
  components: { Bank, AreaLink },
  setup() {
    // 初始化数据
    const data: DataProps = reactive({
      bankArray: [],
      subBankArray: [],
      bankName: '',
      width: '350px',
      disabled: false,
      valueKey: 'bankName',
      araeSelectData: {
        provinceCode: '',
        cityCode: '',
        areaCode: '',
      },
      bankCode: 0,
      cityCode: 0,
      subBankName: '',
      placeholderSub: '请输入支行名称',
    })
    // 选中银行
    const handleSelect = ($event: any) => {
      data.bankName = $event.bankName
      data.bankCode = $event.bankCode
    }

    onMounted(() => {
      getBankList()
    })
    // 请求银行总行接口
    const getBankList = async () => {
      await api.findTopBank().then((res: any) => {
        data.bankArray = res.data
      })
    }
    // 选中省市区接口
    const onChange = (areaData: Object) => {
      data.cityCode = areaData.cityCode
      getBankPoint()
    }
    // 支行接口请求
    const getBankPoint = async () => {
      await api
        .getBankPoint({
          bankType: data.bankCode,
          areaCode: data.cityCode,
        })
        .then((res: any) => {
          data.subBankArray = res.data
        })
    }
    // 选中的支行
    const handleSubSelect = ($event: any) => {
      data.subBankName = $event.bankName
    }

    const refData = toRefs(data)
    return {
      ...refData,
      handleSelect,
      getBankList,
      onChange,
      getBankPoint,
      handleSubSelect,
    }
  },
})
</script>

<style lang="scss" scoped>
.bank_row {
  display: flex;
  justify-content: center;
}
</style>
