import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue } from 'bootstrap-vue'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(BootstrapVue)

new Vue({
    render: h => h(App)
}).$mount('#app')