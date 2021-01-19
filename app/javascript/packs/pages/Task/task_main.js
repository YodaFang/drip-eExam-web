import Vue from 'vue'
import App from './TaskApp.vue'
import router from './task_router'
import vuetify from './vuetify'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
  router,
  vuetify,
  render: h => h(App),
  el: '#app'
  }).$mount()
})
