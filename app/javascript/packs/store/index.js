
const store = {
  __isDebug: true,
  __data: {},
  errorMessages: null,
  isShowLoading: false,
  isShowAlerts: false,
  maxWidth: 1260,
  home: null,
  user: null,
  exam: null,

  init() {
    if(this.home){
      this.home.setDebug(this.__isDebug);
      this.home.init();
    }
    if(this.user){
      this.user.setDebug(this.__isDebug);
      this.user.init();
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

  showLoading(){
    this.isShowLoading = true;
  },

  hideLoading(){
    this.isShowLoading = false;
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
