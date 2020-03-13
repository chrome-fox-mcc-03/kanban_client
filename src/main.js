import Vue from 'vue'
import App from './App.vue'
import AtComponents from 'at-ui'
import 'at-ui-style'

Vue.use(AtComponents)

new Vue({
  render: h => h(App)
}).$mount('#app')
