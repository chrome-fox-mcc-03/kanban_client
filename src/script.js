"use strict"

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueToastify from "vue-toastify";
Vue.use(VueToastify);
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
new Vue({
    render: h => h(App)
}).$mount('#app')

