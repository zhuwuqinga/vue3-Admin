# 银行组件

### 说明

- 基于 Element-plus 中 autocomplete 的二次封装[链接地址](https://element-plus.gitee.io/#/zh-CN/component/input)

- vue3+typeScript

---

### api 参数

|    参数     |                说明                 |  类型   |  可选  |      默认      |
| :---------: | :---------------------------------: | :-----: | :----: | :------------: |
|    data     | 从服务端银行数据，银行名称、code 等 |  Array  |  必填  |       []       |
|    width    |           input 长度(px)            | String  | 非必填 |     300px      |
|  disabled   |              是否禁用               | Boolean | 非必填 |     false      |
|  valueKey   |    输入建议对象中用于显示的键名     | String  |  必填  |    bankName    |
| placeholder |              提示信息               | String  | 非必填 | 请输入银行名称 |

### api 回调方法

|     名称     |                     说明                     |   类型   | 可选 |
| :----------: | :------------------------------------------: | :------: | :--: |
| handleSelect | 选中返回的参数(event),子组件调用父组件的方法 | function | 必填 |

### 示例

```typescript
    <bank
        v-if="data1.length>0"
        @handleSelect="handleSelect"
        :data="data1"
        :width="width"
        :disabled="disabled"
        :valueKey="valueKey"
     ></bank>

```
