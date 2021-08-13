/*
 * @Author: fanheng 
 * @Date: 2021-07-26 11:57:08 
 * @Last Modified by:   fanheng 
 * @Last Modified time: 2021-07-26 11:57:08 
 */
/**
 * 基础数据 API 集合类
 * 集成Abstract
 * @date 2021-7-26
 */
import Abstract from "../request";
import { GetDemo, PostDemo } from "../types";

class Basic extends Abstract {
  /**
   * get示例
   */
  getDemo(params: GetDemo) {
    return this.getReq({ url: "Basic.GetDemo", params });
  }

  /**
   * post示例
   */
  postDemo(data?: any) {
    return this.postReq({ url: "Basic.PostDemo", data });
  }
  /**
   * 请求示例
   */
   saveCust(data?: any) {
    return this.postReq({ url: "cust.SaveCust", data });
  }
  /**
   * 请求银行
   */
   findTopBank(data?:any){
     return this.postReq({url:'cust.findTopBank',data})
   }
   /**
    * 请求支行
    */
    getBankPoint(params?:any){
      return this.postReq({url:'cust.getBankPoint',params})
    }
}

// 单列模式返回对象
let instance;
export default (() => {
  if (instance) return instance;
  instance = new Basic();
  return instance;
})();
