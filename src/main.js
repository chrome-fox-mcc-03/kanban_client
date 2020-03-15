import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue'
import GAuth from 'vue-google-oauth2'
import '../assets/style/style.css'

const gauthOption = {
  clientId: '150496618824-qbaku7n7k1cnqk1bnb4ehotjjg6cb0r6.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
Vue.use(SuiVue)

new Vue({
  render: h => h(App),
}).$mount('#app');