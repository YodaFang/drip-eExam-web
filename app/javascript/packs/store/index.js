import Cookies from 'js-cookie'
import request from '@/utils/request'

const store = {
  __isDebug: true,
  __data: {},
  errorMessages: null,
  isShowLoading: false,
  isShowAlerts: false,
  isShowSignInUp: false,
  maxWidth: 1260,
  home: null,
  exam: null,
  __userName: '',
  __userLogin: '',

  init() {
    this.loginByToken();
    if(this.home){
      this.home.setDebug(this.__isDebug);
      this.home.init();
    }
    if(this.exam){
      this.exam.setDebug(this.__isDebug);
      this.exam.init();
    }
  },

  showErrors(message){
    this.errorMessages = message;
    this.isShowAlerts = true;
  },

  showSignInUp(){
    this.isShowSignInUp = true;
  },

  hideSignInUp(){
    this.isShowSignInUp = false;
  },

  showLoading(){
    this.isShowLoading = true;
  },

  hideLoading(){
    this.isShowLoading = false;
  },

  isLogin(){
    return this.__userName && this.__userName.length > 0;
  },

  userName(){
    return this.__userName;
  },

  logout(){
    this.__userName = null;
    this.__userLogin = null;
    Cookies.remove('token_94');
  },

  loginByToken(doneCallBack = null, failCallBack = null){
    let token_94 = Cookies.get('token_94');
    if (!token_94) return false;
    const _this = this;
    request.post('/loginByToken', { token_94: token_94 }).then((resData) => {
      if(resData.success){
        _this.__userName = resData.user_info.name;
        _this.__userLogin = resData.user_info.login;
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
        _this.__userName = resData.user_info.name;
        _this.__userLogin = resData.user_info.login;
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
        _this.__userName = resData.user_info.name;
        _this.__userLogin = resData.user_info.login;
        Cookies.set('token_94', resData.remember_token);
      }
      if(doneCallBack) doneCallBack(resData.success);
    }).catch((err) => {
      if(failCallBack) failCallBack(err);
    })
  },

  setValue(p, v) {
    if (this.__isDebug) console.log('set action triggered with', v)
    this.__data[p] = v
  },

  getValue(p) {
    return this.__data[p]
  }
}

export default store
