<template>
  <div>
    <!-- 自定义上传 -->
    <el-upload
      v-if="openHttpRequest"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      :http-request="uploadFileByNetWork"
      ref="upload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-if="tips">
        {{ tips }}
      </div>
    </el-upload>
    <!-- action指定上传路径 -->
    <el-upload
      v-if="!openHttpRequest"
      :action="action"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="limit"
      :on-exceed="handleExceed"
      :file-list="fileList"
      ref="upload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip" v-if="tips">
        {{ tips }}
      </div>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'UploadFile',
  props: {
    //开启自定义上传方法
    openHttpRequest: {
      type: Boolean,
      required: true,
      defalut: false,
    },
    //自定义上传方法
    uploadFileByNetWork: {
      type: Function,
      required: false,
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview: {
      type: Function,
      required: false,
    },
    //文件列表移除文件时的钩子
    handleRemove: {
      type: Function,
      required: false,
    },
    //删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。
    beforeRemove: {
      type: Function,
      required: false,
    },
    //文件超出个数限制时的钩子
    handleExceed: {
      type: Function,
      required: false,
    },
    //上传路径
    action: {
      type: String,
      required: false,
    },
    //最大文件上传个数
    limit: {
      type: Number,
      required: false,
      defalut: 1,
    },
    //上传提示
    tips: {
      type: String,
      required: false,
      defalut: '只能上传jpg/png文件，且不超过500kb',
    },
  },
  setup(props, ctx) {
    //设置数据类型
    interface dataType {
      //文件列表
      fileList: Object[]
    }
    //基础数据
    const data: dataType = reactive({
      fileList: [],
    })
    return {
      ...toRefs(data),
    }
  },
})
</script>
