const store = {
  __isDebug: true,
  __data: {},
  warningMessages: null,
  errorMessages: null,
  isShowLoading: false,
  isShowAlerts: false,
  isLogin: false,
  userInfo: {},
  showErrors(message){
    this.warningMessages = null;
    this.errorMessages = message;
    this.isShowAlerts = true;
  },
  showWarnings(message){
    this.warningMessages = message;
    this.errorMessages = null;
    this.isShowAlerts = true;
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
