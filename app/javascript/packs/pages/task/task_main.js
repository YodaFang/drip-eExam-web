import Vue from 'vue'
import App from './TaskApp.vue'
import router from './router'
import vuetify from '@/plugin/vuetify'

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
  router,
  vuetify,
  render: h => h(App),
  el: '#task_app'
  }).$mount()
})
