import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import VueFormGenerator from 'vue-form-generator/dist/vfg-core.js'
// import 'vue-form-generator/dist/vfg-core.css'

// Vue.use(VueFormGenerator)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
