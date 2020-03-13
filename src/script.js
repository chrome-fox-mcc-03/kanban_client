"use strict"
import Vue from 'vue'
import App from './App.vue'
import VueToastify from "vue-toastify";
Vue.use(VueToastify);
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3001',
}))

new Vue({
    render: h => h(App)
}).$mount('#app')



