<template>
  <div>
    <UploadFile
      :openHttpRequest="true"
      :uploadFileByNetWork="uploadFileByNetWork"
      :handleExceed="handleExceed"
      :limit="limit"
      :tips="tips"
      ref="uploadRef"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted } from 'vue'
import UploadFile from 'components/uploadFile/index.vue'
import base64toBlob from 'components/uploadFile/utils/index.ts'
export default {
  components: { UploadFile },
  setup(props) {
    //设置数据类型
    interface dataType {
      uploadFileRequest: (params?: any) => void
      uploadRef?: any
      limit: Number
      tips: String
      handleExceed: (files: Object, fileList: Object[]) => void
    }
    //基础数据
    const data: dataType = reactive({
      //网络请求处理
      uploadFileByNetWork: (params: any) => {
        const file: any = params.file
        var reader: any = new FileReader()
        //判断文件大小,大小限制抽离出来
        if (file.size / 1024 >= 1024) {
          ElMessage({
            message: '图片过大请压缩后上传',
            type: 'error',
          })
          params.onError()
          return
        }
        reader.readAsDataURL(file)
        reader.onload = () => {
          const imgBase64: any = reader.result
          const formData = new FormData()
          formData.append('pic', base64toBlob(imgBase64))
          //下面处理网络请求
          params.onSuccess()
        }
      },
      //获取子组件
      uploadRef: ref(null),
      limit: 1,
      tips: '图片须小于1024KB,请使用压缩后提交',
      handleExceed: (files: Object, fileList: Object[]) => {
        console.log(files)
        console.log(fileList)
        data.uploadRef.clearFiles()
      },
    })
    return {
      ...toRefs(data),
    }
  },
}
</script>
