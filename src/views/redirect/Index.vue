<template>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const route = useRoute()
    const router = useRouter()
    const { params, query } = route
    const { path } = params
    const refresh = (() => {
      router.replace({ path: '/' + path, query }).catch((err) => {
        console.warn(err)
      })
    })
    onBeforeMount(() => {
      refresh()
    })
  }
})
</script>
