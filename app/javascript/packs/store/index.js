import user from '@/store/user'

const store = {
  __isDebug: true,
  __data: {},
  user: null,
  errorMessages: null,
  isShowLoading: false,
  isShowAlerts: false,
  maxWidth: 1260,
  showErrors(message){
    this.errorMessages = message;
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
