import Vue from 'vue';
import App from './App.vue';
import Toasted from 'vue-toasted'
import GSignInButton from 'vue-google-signin-button'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://kanban-hacktiv8.herokuapp.com'
}))
Vue.use(Toasted, {
  duration: 3000,
  position: 'top-right',
})
Vue.use(GSignInButton)
new Vue({
  render: h => h(App),
}).$mount('#app');