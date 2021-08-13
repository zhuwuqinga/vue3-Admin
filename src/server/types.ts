/*
 * @Author: fanheng
 * @Date: 2021-07-26 11:58:54
 * @Last Modified by: fanheng
 * @Last Modified time: 2021-07-29 15:25:43
 */
/**
 * 封装公共接口数据类型
 */
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'
export type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'

export interface AxiosRequest {
  baseURL?: string
  url: string
  method?: Method
  headers?: any
  timeout?: number
  responseType?: ResponseType
  data?: any
  dataType?: String
  params?: any
}
export interface AxiosResponse {
  data: any
  headers: any
  request?: any
  status: number
  statusText: string
  config: AxiosRequest
}
export interface CustomResponse {
  readonly status: boolean
  readonly message: string
  data: any
  origin?: any
}
export interface UrlDict {
  [key: string]: {
    [key: string]: string
  }
}
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
