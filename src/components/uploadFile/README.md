# 文件上传组件

## 组件代码

```html
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
    <div slot="tip" class="el-upload__tip" v-if="tips">{{ tips }}</div>
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
    <div slot="tip" class="el-upload__tip" v-if="tips">{{ tips }}</div>
  </el-upload>
</div>
```

## 目录

├─uploadFile
│ │ utils ---工具类
│ │ index.vue ---主组件
│ │ README.md --- 说明文档

### 参数

| 参数                | 说明                                                                                                    | 参数数据类型 | 是否必填                        | 可选参       | 默认值 |
| ------------------- | ------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------- | ------------ | ------ |
| openHttpRequest     | 是否需要开启自定义上传方法                                                                              | Boolean      | 必填                            | true / false | false  |
| uploadFileByNetWork | 自定义上传方法                                                                                          | Function     | openHttpRequest 为 false 非必填 | -            | -      |
| handlePreview       | 点击文件列表中已上传的文件时的钩子                                                                      | Function     | 非必填                          | -            | -      |
| handleRemove        | 文件列表移除文件时的钩子                                                                                | Function     | 非必填                          | -            | -      |
| beforeRemove        | 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除。 | Function     | 非必填                          | -            | -      |
| handleExceed        | 文件超出个数限制时的钩子                                                                                | Function     | 非必填                          | -            | -      |
| action              | 上传路径                                                                                                | String       | 非必填                          | -            | -      |
| limit               | 最大文件上传个数                                                                                        | Number       | 非必填                          | -            | 1      |
| tips                | 上传提示                                                                                                | Number       | 非必填                          | -            | -      |

## 工具类

| 方法         | 说明                | 参数类型 | 参数说明      |
| ------------ | ------------------- | -------- | ------------- |
| base64toBlob | base64 转二进制文件 | String   | base64 字符串 |

## 未完事项

1.回显文件
