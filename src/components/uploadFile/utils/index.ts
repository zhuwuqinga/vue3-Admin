//base64转二进制文件
export default function base64toBlob(params: String): any {
  // 将base64转为Unicode规则编码
  let arr: any = params.split(',')
  // 注意base64的最后面中括号和引号是不转译的
  let _arr: any = arr[1].substring(0, arr[1].length - 2)
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr: any = atob(_arr)
  let n: any = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {
    type: mime,
  })
}
