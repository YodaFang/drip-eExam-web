import Cookies from 'js-cookie'
import request from '@/utils/request'

const user = {
  __isDebug: false,
  __name: '',
  __login: '',

  init(){
    this.loginByToken();
  },

  name(){
    return this.__name;
  },

  logout(){
    this.__name = null;
    this.__login = null;
    Cookies.remove('token_94');
  },

  loginByToken(doneCallBack = null, failCallBack = null){
    let token_94 = Cookies.get('token_94');
    if (!token_94) return false;
    const _this = this;
    request.post('/loginByToken', { token_94: token_94 }).then((resData) => {
      if(resData.success){
        _this.__name = resData.user_info.name;
        _this.__login = resData.user_info.login;
        Cookies.set('token_94', resData.remember_token);
      }
      if(doneCallBack) doneCallBack(resData.success);
    }).catch((err) => {
      if(failCallBack) failCallBack(err);
    })
  },

  loginByAcount(params, doneCallBack = null, failCallBack = null){
    const _this = this;
    request.post('/loginByAcount', params).then((resData) => {
      if(resData.success){
        _this.__name = resData.user_info.name;
        _this.__login = resData.user_info.login;
        Cookies.set('token_94', resData.remember_token);
      }
      if(doneCallBack) doneCallBack(resData.success);
    }).catch((err) => {
      if(failCallBack) failCallBack(err);
    })
  },

  accountCheck(login, doneCallBack = null, failCallBack = null) {
    request.get('/register_check',{ login: login }).then((resData) => {
      if(doneCallBack) doneCallBack(resData.success);
    }).catch((err) => {
      if(failCallBack) failCallBack(err);
    })
  },

  register(params, doneCallBack = null, failCallBack = null) {
    const _this = this;
    request.post('/register', params).then((resData) => {
      if(resData.success){
        _this.__name = resData.user_info.name;
        _this.__login = resData.user_info.login;
        Cookies.set('token_94', resData.remember_token);
      }
      if(doneCallBack) doneCallBack(resData.success);
    }).catch((err) => {
      if(failCallBack) failCallBack(err);
    })
  },

  setDebug(v) {
    this.__isDebug = v
  },
}

export default user
