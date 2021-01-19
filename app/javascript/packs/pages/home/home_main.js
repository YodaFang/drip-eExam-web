import Vue from 'vue'
import App from './HomeApp.vue'
import router from './router'
import vuetify from './vuetify'
import store from '@/store'


document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    data: store,
    router,
    vuetify,
    render: h => h(App),
    el: '#app'
  }).$mount()
})
