import Vue from 'vue'
import App from './ExamApp.vue'
import vuetify from '@/plugin/vuetify'
import store from '@/store/index'
import exam from '@/store/exam'

// Vue需要对data中数据添加些方法属性，从而能够监听data，所以需要将对象设置为可被修改
Object.defineProperty(store, "exam", {
  value: exam,
  writable: true,
  configurable: true
});

new Vue({
  data: store,
  vuetify,
  render: h => h(App),
  el: '#exam_app'
}).$mount()


