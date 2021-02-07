import Vue from 'vue'
import App from './ExamApp.vue'
import vuetify from '@/plugin/vuetify'

import exam_manager from '@/store/exam_manager'

new Vue({
  data: exam_manager,
  vuetify,
  render: h => h(App),
  el: '#exam_app'
}).$mount()
