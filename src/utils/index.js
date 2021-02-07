
// 获取iframe外部主窗口的参数
export function getIframeParentUrlParam () { // 获取iframe外部的URL和参数
  // let pos, str, para, parastr
  let str, parastr
  let array = []
  str = document.referrer
  if (str.indexOf('?') !== -1) {
    parastr = str.split('?')[1]
  } else {
    return
  }
  let arr = parastr.split('&')
  for (let i = 0; i < arr.length; i++) {
    array[arr[i].split('=')[0]] = arr[i].split('=')[1]
  }
  return array
}
// 获取当前URL参数外部主窗口的参数
export function getUrlParam (paraName) {
  let url = document.location.toString()
  let arrObj = url.split('?')

  if (arrObj.length > 1) {
    let arrPara = arrObj[1].split('&')
    let arr

    for (let i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')

      if (arr != null && arr[0] === paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}
