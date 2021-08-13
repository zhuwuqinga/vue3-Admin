<template>
  <el-dialog title="成本配置" v-model="dialogVisible" width="50%">
    <el-row :gutter="20">
      <el-col :span="8">
        <ScreenCell cell-name="代理商编号"> </ScreenCell>
      </el-col>
      <el-col :span="8">
        <ScreenCell cell-name="代理商名称"> </ScreenCell>
      </el-col>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import ScreenCell from '../ScreenCell/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    ScreenCell,
  },
  props: {
    // 对话框显示与隐藏
    dialogVisible: {
      type: Boolean,
      required: true,
      defalut: () => {
        return false
      },
    },
  },
  setup(props: any, context: any) {
    return {}
  },
})
</script>
