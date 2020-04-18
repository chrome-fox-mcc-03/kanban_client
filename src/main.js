import Vue from 'vue';
import App from './App.vue'
import Notification from 'vue-notification'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)
Vue.use(Notification)
new Vue ({
    render: h => h(App),
}).$mount('#app')