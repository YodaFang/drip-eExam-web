import Vue from 'vue'
import App from './ExamApp.vue'
import vuetify from '@/plugin/vuetify'
import store from '@/store/index'
import exam from '@/store/exam'
import user from '@/store/user'

// Vue需要对data中数据添加些方法属性，从而能够监听data，所以需要将对象设置为可被修改
Object.defineProperty(store, "user", {
  value: user,
  writable: false,
  configurable: false
});
Object.defineProperty(store, "exam", {
  value: exam,
  writable: false,
  configurable: false
});

new Vue({
  data: store,
  vuetify,
  render: h => h(App),
  el: '#exam_app'
}).$mount()

// Vue初始化完后将对象属性设置为不被修改
Object.defineProperty(store, "user", {
  writable: false,
  configurable: false
});
Object.defineProperty(store, "exam", {
  writable: false,
  configurable: false
});

