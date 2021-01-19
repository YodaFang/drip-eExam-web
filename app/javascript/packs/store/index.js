const store = {
  debug: true,
  state: {
    message: 'Hello Vue!',
    warningMessages: null,
    errorMessages: null,
    showLoading: false,
    showAlerts: false,
    userInfo: {},
  },
  setShowLoading(v){
    this.state.showLoading = v;
  },
  isShowLoading(){
    return this.state.showLoading;
  },
  showErrors(message){
    this.warningMessages = null;
    this.errorMessages = message;
    this.state.showAlerts = true;
  },
  showWarnings(message){
    this.warningMessages = message;
    this.errorMessages = null;
    this.state.showAlerts = true;
  },
  setShowAlerts(v){
    this.state.showAlerts = v;
  },
  isShowAlerts(){
    return this.state.showAlerts;
  },
  getWarningMessages(){
    return this.state.warningMessages;
  },
  getErrorMessages(){
    return this.state.errorMessages;
  },
  set(p, v) {
    if (this.debug) console.log('set action triggered with', v)
    this.state[p] = v
  },
  get(p) {
    return this.state[p]
  }
}

export default store
