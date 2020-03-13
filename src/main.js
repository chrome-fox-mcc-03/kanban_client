import Vue from 'vue';
import App from './App.vue';
import VueToastify from "vue-toastify"
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '194565501537-qmb464ef83ic0suedoturuv0urp3s4jp.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}


Vue.use(VueToastify, GAuth, gauthOption);

new Vue({
    render: h => h(App),
}).$mount('#app');
