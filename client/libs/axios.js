import axios from 'axios'
import store from '~/store'
import qs from 'qs'
// import util from '~/libs/util'
import { setLocal, getLocal } from '~/libs/util'
import { showToast } from '~/components/toast'

const addErrorLog = errorInfo => {
  const {
    statusText,
    status,
    request: { responseURL }
  } = errorInfo
  let info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL
  }
  if (!responseURL.includes('save_error_logger'))
    store.dispatch('addErrorLog', info)
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      timeout: 5000, // 请求超时时间
      withCredentials: true,
      headers: {
        //
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      config => {
        qs.stringify(config.data)
        // 在请求发送之前做一些处理
        // debugger
        if (!/^https:\/\/|http:\/\//.test(config.url)) {
          const token = getLocal('token')
          if (token && token !== 'undefined') {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            console.log('token', token, typeof token)

            config.headers.common['Authorization'] = 'Basic ' + token + 'Og=='
          }
        }
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        this.queue[url] = true
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      res => {
        this.destroy(url)
        console.log('res', res)
        const {
          data: { data, error_code },
          status
        } = res
        return { error_code, data, status }
      },
      error => {
        this.destroy(url)
        let errorInfo = error.response
        console.log('errorInfo', errorInfo)
        if (!errorInfo) {
          const {
            request: { statusText, status },
            config
          } = JSON.parse(JSON.stringify(error))
          errorInfo = {
            statusText,
            status,
            request: { responseURL: config.url }
          }
        } else {
          switch (errorInfo.status) {
            case 404:
              console.log('请求发生404错误')
              break
            case 500:
              console.log('请求发生500错误')
              break
            case 504:
              console.log('请求超时')
              break
            case 400: // 用户没有csrf-token
              if (errorInfo.data && errorInfo.data.msg) {
                Object.values(errorInfo.data.msg).forEach(val => {
                  showToast(val[0])
                })
              }
              break
            case 401: // 用户没有登录态
              if (errorInfo.data && errorInfo.data.msg) {
                showToast(errorInfo.data.msg)
              }
              // if (!this.isLogin && process.client) {
              //   // 只使第一次401的hash
              //   this.isLogin = true
              //   if (window.location.pathname || window.location.hash) {
              //     this.next = encodeURIComponent(
              //       window.location.pathname + window.location.hash
              //     )
              //   }
              //   const redirect = '/login?next=' + this.next
              //   window.location.href = location.origin + redirect
              // }
              break
            default:
              console.log('error:' + error.response.status)
              break
          }
        }
        // addErrorLog(errorInfo)
        return Promise.reject(error)
      }
    )
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
