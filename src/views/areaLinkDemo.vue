<template>
  <div>
    <AreaLink @onChange="onChange"></AreaLink>
    <div class="backData">
      <div>选中的省：{{ araeSelectData.provinceCode }}</div>
      <div>选中的市：{{ araeSelectData.cityCode }}</div>
      <div>选中的区：{{ araeSelectData.areaCode }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import AreaLink from '@/components/areaLink/Index.vue'
import { constants } from 'crypto'
export default defineComponent({
  name: 'AreaLinkDemo',
  components: {
    AreaLink,
  },
  setup() {
    interface routeData {
      araeSelectData: {
        provinceCode: String
        cityCode: String
        areaCode: String
      }
      onChange: (areaData: Object) => void
    }
    const data: routeData = reactive({
      araeSelectData: {
        provinceCode: '',
        cityCode: '',
        areaCode: '',
      },
      onChange: (areaData: Object) => {
        data.araeSelectData = areaData
      },
    })
    onMounted(() => {})
    return {
      ...toRefs(data),
    }
  },
})
</script>
<style lang="scss" scoped>
.backData {
  display: flex;
  flex-direction: column;
  width: 150px;
  margin-top: 10px;
}
</style>
