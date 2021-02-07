import axios from 'axios'
import { Message } from 'element-ui'
// 环境转换
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求超时秒数
axios.defaults.timeout = 60000

// 携带cookies
axios.defaults.withCredentials = true

// post请求头
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // let token = window.localStorage.getItem('token')
  // if (token) {
  //   // 将token放到请求头发送给服务器,将tokenkey放在请求头中
  //   config.headers.token = token
  //   // 也可以这种写法
  //   // config.headers['token'] = token;
  // }
  return config
}, function (error) {
  Message.error('请求超时')
  // Do something with request error
  return Promise.reject(error)
})

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  // if (response.data.ret && response.data.ret === 302) {
  //   window.parent && window.parent.postMessage('reload', '*')
  //   location.href = response.data.redirectUrl
  // }
  return response
}, function (error) {
  Message.error('服务器连接失败')
  return Promise.reject(error)
})

// 通用方法
export const POST = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.response.statusText)
      })
  })
}

export const GET = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params })
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err.response.statusText)
      })
  })
}

// export const PUT = (url, params) => {
//   return new Promise((resolve, reject) => {
//     axios.put(url, params)
//       .then(res => {
//         resolve(res.data)
//       }).catch(err => {
//         reject(err.response.statusText)
//       })
//   })
// }
//
// export const DELETE = (url, params) => {
//   return new Promise((resolve, reject) => {
//     axios.delete(url, { params: params })
//       .then(res => {
//         resolve(res.data)
//       }).catch(err => {
//         reject(err.response.statusText)
//       })
//   })
// }

// export const PATCH = (url, params) => {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, params)
//       .then(res => {
//         resolve(res.data)
//       }).catch(err => {
//         reject(err.response.statusText)
//       })
//   })
// }
export default axios
