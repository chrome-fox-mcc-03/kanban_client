import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import Toasted from "vue-toasted"
// import GSignInButton from 'vue-google-signin-button'


Vue.use(Toasted, {
  duration: 3000,
  position: "top-right",
})
// Vue.use(GSignInButton)
new Vue({
  render: h => h(App),
}).$mount('#app');