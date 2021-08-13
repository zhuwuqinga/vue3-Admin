<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from 'vue'
import api from '@/server/api/test'
export default defineComponent({
  name: 'Request',
  setup() {
    console.log(api)
  },
})
</script>
