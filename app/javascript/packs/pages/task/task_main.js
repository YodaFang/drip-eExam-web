import Vue from 'vue'
import App from './TaskApp.vue'
import vuetify from '@/plugin/vuetify'

import task_manager from '@/store/task_manager'


new Vue({
  data: task_manager,
  vuetify,
  render: h => h(App),
  el: '#task_app'
}).$mount()

