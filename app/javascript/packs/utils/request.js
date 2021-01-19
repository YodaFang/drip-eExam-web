import axios from 'axios'
import vue from 'vue'

const request = function (loadtip, url, params, method) {
  let loading
  if (loadtip) {
    loading = vue.prototype.$loading({
      lock: false,
      text: '拼命加载中…',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.5)'
    })
  }
  let query = {
    baseURL: '/api',
    url: url,
    method: method,
    timeout: 5000,
    data: params,
  }
  return axios.request(query).then(res => {
      if (loadtip) {
        loading.close()
      }
      return Promise.resolve(res.data)
    }).catch(e => {
      if (loadtip) {
        loading.close()
      }
      return Promise.reject(e.message)
    })
}

const post = function (url, params) {
  return request(false, url, params, 'post')
}

const postWithOutLoadTip = function (url, params) {
  return request(false, url, params, 'post')
}

const get = function (url, params) {
  return request(false, url, params, 'get')
}

const form = function (url, params) {
  return request(false, url, params, 'post', 'multipart/form-data')
}

export {
  post,
  postWithOutLoadTip,
  get,
  form
}
