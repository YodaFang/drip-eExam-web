import axios from 'axios'
import store from '@/store'

const request = function (loadtip, url, params, method) {
  if (loadtip) {
    store.isShowLoading = true;
  }
  let query = {
    // baseURL: '/api',
    url: url,
    method: method,
    timeout: 5000,
    data: params,
  }
  return axios.request(query).then(res => {
      store.isShowLoading = false;
      return Promise.resolve(res.data);
    }).catch(e => {
      store.isShowLoading = false;
      return Promise.reject(e);
    })
}

const post = function (url, params) {
  return request(true, url, params, 'post')
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
