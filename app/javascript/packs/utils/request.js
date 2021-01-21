import axios from 'axios'
import store from '@/store/index'

const request = function(loadtip, url, params, method) {
  if (loadtip) store.isShowLoading = true;
  let query = {
    // baseURL: '/api',
    url: url,
    method: method,
    timeout: 5000,
    data: params,
  }
  return axios.request(query).then(res => {
      if (loadtip) store.isShowLoading = false;
      return Promise.resolve(res.data);
    }).catch(err => {
      if (loadtip) store.isShowLoading = false;
      if(err.response && err.response.status == 488){
        if(err.response.data.errors) store.showErrors(err.response.data.errors)
      } else {
        console.log(err)
        console.log(err.response)
      }
      return Promise.reject(err);
    })
}

export default {
  post: function(url, params) {
    return request(true, url, params, 'post')
  },
  postWithOutLoadTip: function(url, params) {
    return request(false, url, params, 'post')
  },
  get: function(url, params) {
    return axios.get(url, {params: params}).then(res => {
      return Promise.resolve(res.data);
    }).catch(err => {
      if(err.response && err.response.status == 488){
        if(err.response.data.errors) store.showErrors(err.response.data.errors)
      } else {
        console.log(err)
        console.log(err.response)
      }
      return Promise.reject(err);
    })
  }
}
