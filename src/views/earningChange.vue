<template>
  <div>
    <el-card>
      <el-row>
        <el-button
          type="primary"
          @click="changeSharBenift(82391438160, '测试代理商')"
        >
          修改分润成本</el-button
        >
      </el-row>
      <ShareBenefit :dialogVisible="dialogVisible"></ShareBenefit>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import ShareBenefit from '@/components/shareBenefit/shareBenefit.vue'
import api from '../server/api/agent'
export default defineComponent({
  components: {
    ShareBenefit,
  },
  setup() {
    const data = reactive({
      dialogVisible: false,
    })

    // 修改分润
    const changeSharBenift = (agentNo: number, agentName: string) => {
      data.dialogVisible = true
      queryAgentCostList(agentNo)
    }

    // 展示提现费
    const queryAgentCostList = async (agentNo: number) => {
      await api
        .queryTransactionTypeInfo({
          agentNo: agentNo,
        })
        .then((res: any) => {})
    }

    const refData = toRefs(data)
    return {
      ...refData,
      changeSharBenift,
    }
  },
})
</script>
>
