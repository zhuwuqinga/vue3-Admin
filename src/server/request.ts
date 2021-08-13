/*
 * @Author: fanheng
 * @Date: 2021-07-26 11:58:44
 * @Last Modified by: fanheng
 * @Last Modified time: 2021-07-29 15:44:17
 */
/**
 * axios基础构建.请求方法构建
 * @date 2021-07-26
 */

import Vue from 'vue'
import getUrl from './config'
import instance from './intercept'
import Qs from 'qs'
import { AxiosRequest, CustomResponse } from './types'

class Abstract {
  // 外部传入的baseUrl
  protected baseURL: string = 'https://t-bcasapi.bcasmw.cn/agent-gateway'
  // 自定义header头
  protected headers: object = {
    ContentType: 'application/json;charset=UTF-8',
  }

  private apiAxios({
    baseURL = this.baseURL,
    headers = this.headers,
    method,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest): Promise<CustomResponse> {
    // url解析
    const _url = (url as string).split('.')
    // console.log(_url);

    url = getUrl(_url[0], _url[1])
    // console.log(url);

    return new Promise((resolve, reject) => {
      instance({
        baseURL,
        headers,
        method,
        url,
        params,
        data,
        responseType,
      })
        .then((res) => {
          console.log(res)

          // 200:服务端业务处理正常结束
          if (res.status === 200) {
            if (res.data.code === 200) {
              resolve({
                status: true,
                message: 'success',
                data: res.data?.object,
                origin: res.data,
              })
            } else {
              resolve({
                status: false,
                message: res.data?.message || url + '请求失败',
                data: res.data?.object,
                origin: res.data,
              })
            }
          } else {
            resolve({
              status: false,
              message: res.data?.message || url + '请求失败',
              data: null,
            })
          }
        })
        .catch((err) => {
          const message = err?.data?.message || err?.message || url + '请求失败'

          // eslint-disable-next-line
          reject({ status: false, message, data: null })
        })
    })
  }

  /**
   * GET类型的网络请求
   */
  protected getReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'GET',
      url,
      data,
      params,
      responseType,
    })
  }

  /**
   * POST类型的网络请求
   */
  protected postReq({
    baseURL,
    headers,
    url,
    data,
    dataType,
    params,
    responseType,
  }: AxiosRequest) {
    if (dataType === 'FORM') {
      data = Qs.stringify(data)
    }
    return this.apiAxios({
      baseURL,
      headers,
      method: 'POST',
      url,
      data,
      params,
      responseType,
    })
  }

  /**
   * PUT类型的网络请求
   */
  protected putReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'PUT',
      url,
      data,
      params,
      responseType,
    })
  }

  /**
   * DELETE类型的网络请求
   */
  protected deleteReq({
    baseURL,
    headers,
    url,
    data,
    params,
    responseType,
  }: AxiosRequest) {
    return this.apiAxios({
      baseURL,
      headers,
      method: 'DELETE',
      url,
      data,
      params,
      responseType,
    })
  }
}

export default Abstract
