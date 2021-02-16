import Vue from 'vue'
import App from './HomeApp.vue'
import router from './router'
import vuetify from '@/plugin/vuetify'
import store from '@/store/index'

new Vue({
    data: store,
    router,
    vuetify,
    render: h => h(App),
    el: '#home_app'
}).$mount();