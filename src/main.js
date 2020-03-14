import Vue from 'vue'
import App from './App'
import VueToastify from "vue-toastify";
Vue.use(VueToastify);

new Vue({
    el: '#app',
    render: h => h(App)
})