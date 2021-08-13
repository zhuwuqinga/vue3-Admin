# 请求文档

## 目录

├─server
│ │ config.ts
│ │ intercept.ts ---请求拦截器
│ │ README.md ---说明文档
│ │ request.ts ---请求方法
│ │ types.ts ---公共接口数据类型
│ ├─api ---api 集合
│ └─urlDict ---接口数据字典

## 接口数据类型

### 请求数据接口

```typescript
//types.ts 下 AxiosRequest
export interface AxiosRequest {
  baseURL?: string
  url: string
  method?: Method
  headers?: any
  timeout?: number
  responseType?: ResponseType
  data?: any
  params?: any
}
```

| 参数         | 说明                                  | 参数数据类型 | 是否必填 | 可选参数                                             | 默认值 |
| ------------ | ------------------------------------- | ------------ | -------- | ---------------------------------------------------- | ------ |
| baseURL      | 公共地址                              | string       | 否       | -                                                    | -      |
| url          | 请求地址                              | string       | 是       | -                                                    | -      |
| method       | 请求方式                              | string       | 否       | GET / POST / PUT /DELETE                             | -      |
| headers      | 请求头                                | any          | 否       | -                                                    | -      |
| timeout      | 超时时间                              | number       | 否       | -                                                    | -      |
| responseType | 响应类型                              | string       | 否       | arraybuffer / blob / document / json / text / stream | -      |
| data         | 输入参数,post 请求时用                | any          | 否       | -                                                    | -      |
| dataType     | 输入参数,传输 fomrData 数据类型时使用 | String       | 否       | -                                                    | -      |
| params       | 输入参数,get 请求时用                 | any          | 否       | -                                                    | -      |

## 接口字典书写方法

在 urlDict 文件下添加字典,例

```typescript
export const Basic = {
  GetDemo: 'admin/get',
  PostDemo: '/customerIncr/saveCust',
}
```

然后在 index.ts 下添加进去

```typescript
import { Basic } from './common'
import { cust } from './cust'
export const apiRequest = {
  Basic,
  cust,
}
```

## api 书写方式

请求参数接口

```typescript
export interface GetDemo {
  id: number
  str: string
}

export interface PostDemo {
  id: number
  list: Array<{
    id: number
    version: number
  }>
}
```

api.ts 下方法

```typescript

  /**
   * get示例
   */
  getDemo(params: GetDemo) {
    return this.getReq({ url: "Basic.GetDemo", params });
  }

  /**
   * post示例
   */
  postDemo(data: PostDemo) {
    return this.postReq({ url: "Basic.PostDemo", data });
  }
```

## 使用方法

```typescript
//在Vue文件下引入
import api from '../server/api/test.ts' //api目录
//setup中使用
api.postDemo(data).then((res) => {})
```

## 未完成事项

1. 加入获取 token
