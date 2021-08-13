# 分页组件

## 目录

├─areaLink
│ │ Index.vue --- 分页组件
│ │ README.md --- 说明文档

### 参数

```typescript
interface routeData {
  total: Number
  page: Number
  limit: Number
  pageSizes: Number[]
  layout: String
  background: Boolean
  small: Boolean
  hidden: Boolean
  pagination: (pageData: Object) => void
}
```

```pageNation Attributes
| 参数        | 说明                          | 参数数据类型  | 是否必填  | 可选参数                                   | 默认值                              |
| ---------   | -----------                  | ----------   | -------- | --------                                   | ------                             |
| total       | 总条目数                      | Number       | 是       | ---                                        | ---                                |
| page        | 当前页数                      | Number       | 否       | ---                                        | 1                                  |
| limit       | 每页显示条目个数               | Number       | 否       | ---                                        | 10                                 |
| pageSizes   | 每页显示个数选择器的选项设置    | Array        | 否       | ---                                        | [10, 20, 30]                       |
| layout      | 组件布局，子组件名用逗号分隔    | String       | 否       | sizes,prev,pager,next,jumper,->,total,slot | total,sizes,prev,pager,next,jumper |
| background  | 是否为分页按钮添加背景色        | Boolean      | 否       | true/false                                 | true                               |
| small       | 是否使用小型分页样式            | Boolean      | 否       | true/false                                 | false                              |
| hidden      | 是否隐藏组件                   | Boolean      | 否       | true/false                                 | false                              |
| pagination  | pageSize/currentPage改变时出发 | function     | 否       | ---                                        | ---                                |
```

```pageNation Events
pagination: (pageData: Object) => {}
pageData: { page, limit }
```
