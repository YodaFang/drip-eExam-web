import store from '@/store/index'
import jquery from 'jquery'

const syncRequest = function(url, method, params, sucCallback, errorCallback) {
  store.showLoading();
  jquery.ajax({
    url: url,
    type: method,
    data: params,
    async: false,
    success: sucCallback,
    error: errorCallback
  })
  store.hideLoading();
}

const asyncRequest = function(url, method, params, sucCallback, errorCallback) {
  store.showLoading();
  jquery.ajax({
    url: url,
    type: method,
    data: params,
    success: sucCallback,
    error: errorCallback,
    complete: function(){
      store.hideLoading();
    }
  })
}

export default {
  syncGet: function(url, params, sucCallback, errorCallback) {
    return syncRequest(url, 'GET', params, sucCallback, errorCallback)
  },
  syncPost: function(url, params, sucCallback, errorCallback) {
    return syncRequest(url, 'POST', params, sucCallback, errorCallback)
  },
  post: function(url, params, sucCallback, errorCallback) {
    return asyncRequest(url, 'POST', params, sucCallback, errorCallback)
  },
  get: function(url, params, sucCallback, errorCallback) {
    return asyncRequest(url, 'GET', params, sucCallback, errorCallback)
  },
}
