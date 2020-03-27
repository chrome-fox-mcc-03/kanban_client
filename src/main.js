import Vue from "vue"
import App from "./App.vue"
import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: '238384697632-ciputukiua80c6ls3pct6ob8ipp98sj5.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

new Vue({
    render: h => h(App)

}).$mount('#app')