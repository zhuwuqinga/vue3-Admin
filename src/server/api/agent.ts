/*
 * @Author: jingbao
 * @Date: 2021-07-29 11:40:31
 * @Last Modified by: fanheng
 * @Last Modified time: 2021-07-29 15:33:05
 */

import Abstract from '../request'
import { GetDemo, PostDemo } from '../types'

class Basic extends Abstract {
  queryTransactionTypeInfo(data?: any) {
    return this.postReq({
      url: 'agent.queryTransactionTypeInfo',
      data,
    })
  }
}

// 单列模式返回对象
let instance
export default (() => {
  if (instance) return instance
  instance = new Basic()
  return instance
})()
