# 地址选择组件

## 目录

├─areaLink
│ │ city.json --- 地区资源
│ │ Index.vue --- 地区组件
│ │ README.md --- 说明文档

### 参数

```typescript
interface routeData {
  araeSelectData: {
    provinceCode: String
    cityCode: String
    areaCode: String
  }
  showArea: Boolean
  filterable: Boolean
  size: String
  disabled: Boolean
  width: Number
  onChange: (areaData: Object) => void
}
```

```areaLink Attributes
| 参数              | 说明                    | 参数数据类型   | 是否必填  | 可选参数                 | 默认值  |
| ----------------- | -----------             | ------------  | -------- | --------                | ------  |
| araeSelectData    | 省市区 code             | Object        | 否        | ---                     | ---     |
| showArea          | 是否显示地区             | Boolean       | 否       | true/false              | true    |
| filterable        | 是否开启选择框搜索功能    | Boolean       | 否       | true/false              | false   |
| size              | 组件尺寸                 | String        | 否       | medium/small/mini       | small   |
| disabled          | 是否可选                 | Boolean       | 否       | true/false              | false   |
| width             | 宽度                    | Number        | 否        | ---                     | 400     |
| onChange          | 选中值发生变化时触发      | function      | 否       | ---                     | ---     |
```

```araeSelectData Attributes
| 参数             | 说明                   | 参数数据类型   | 是否必填  | 可选参数                  | 默认值       |
| ------------     | ---------------------- | ------------  | --------  | ----------------------- | ----------- |
| provinceCode     | 省code                 | String        | 是        | ---                      | ---         |
| cityCode         | 市code                 | String        | 是        | ---                      | ---         |
| areaCode         | 区code                 | String        | 是        | ---                      | ---         |
```

```onChange Events
onChange: (areaData: Object) => {}
areaData: { provinceCode, cityCode, areaCode } 组件只选择到市的时候，地区code有但为空
```
