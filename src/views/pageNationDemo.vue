<template>
  <div>
    <PageNation
      @pagination="pagination"
      :page="page"
      :limit="limit"
      :total="total"
    ></PageNation>
    <div style="text-align: right; padding-right: 100px">
      选中的page={{ page }};limit={{ limit }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import PageNation from '@/components/pageNation/Index.vue'
export default defineComponent({
  name: 'PageNationDemo',
  components: {
    PageNation,
  },
  setup(props, ctx) {
    interface routeProps {
      page: Number
      limit: Number
      total: Number
      pagination: (pageData: Object) => void
      loadData: () => void
    }
    let data: routeProps = reactive({
      page: 1,
      limit: 10,
      total: 1000,
      pagination: (pageData: Object) => {
        data.page = pageData.page
        data.limit = pageData.limit
        data.loadData()
      },
      loadData: () => {
        
      },
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
