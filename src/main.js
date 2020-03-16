import Vue from 'vue';
import App from './App.vue';
import VueToastify from "vue-toastify"
// import GoogleLogin from 'vue-google-login';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '194565501537-qmb464ef83ic0suedoturuv0urp3s4jp.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

// import GSignInButton from 'vue-google-signin-button'
// Vue.use(GSignInButton)
Vue.use(GAuth, gauthOption);

Vue.use(VueToastify)

new Vue({
    render: h => h(App),
}).$mount('#app');
