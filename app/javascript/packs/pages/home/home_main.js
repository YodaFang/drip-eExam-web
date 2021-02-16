import Vue from 'vue'
import App from './HomeApp.vue'
import router from './router'
import vuetify from '@/plugin/vuetify'
import store from '@/store/index'
import user from '@/store/user'

// Vue需要对data中数据添加些方法属性，从而能够监听data，所以需要将对象设置为可被修改
Object.defineProperty(store, "user", {
  value: user,
  writable: false,
  configurable: true
});

new Vue({
    data: store,
    router,
    vuetify,
    render: h => h(App),
    el: '#home_app'
}).$mount();