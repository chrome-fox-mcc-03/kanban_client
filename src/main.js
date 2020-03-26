import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button'
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  duration: 2000,
  position: 'top-right',
  theme: 'bubble'
})
Vue.use(GSignInButton)


// import Notifications from 'vue-notification'
 
// Vue.use(Notifications)

new Vue({
  render: h => h(App),
}).$mount('#app');