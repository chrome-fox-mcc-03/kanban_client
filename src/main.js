import Vue from 'vue';
import App from './App.vue';
import GSignInButton from 'vue-google-signin-button'
// import Notifications from 'vue-notification'

Vue.use(GSignInButton)
// Vue.use(Notifications)

new Vue({
    render: h => h(App),
}).$mount('#app');