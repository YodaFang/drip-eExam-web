import axios from 'axios'
import store from '@/store/index'
import Cookies from 'js-cookie'

const request = function(loadtip, url, params, method) {
  let token_94 = Cookies.get('token_94');
  console.log(token_94)
  if(token_94) params.token_94 = token_94;
  let config = {
    // baseURL: '/api',
    url: url,
    method: method,
    timeout: 3000,
    data: params,
  }
  return axios.request(config).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    if(err.response && (err.response.status == 488 || err.response.status == 401)){
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
    let token_94 = Cookies.get('token_94');
    if(token_94) params.token_94 = token_94;
    return axios.get(url, { params: params }).then(res => {
      return Promise.resolve(res.data);
    }).catch(err => {
      if(err.response && (err.response.status == 488 || err.response.status == 401)){
        if(err.response.data.errors) store.showErrors(err.response.data.errors)
      } else {
        console.log(err)
        console.log(err.response)
      }
      return Promise.reject(err);
    })
  }
}