import Vue from 'vue';
import App from './App.vue';
import GSignInButton from "vue-google-signin-button";
import Toasted from 'vue-toasted';

Vue.use(Toasted, {
    position: 'bottom-left',
    duration: 3000
})
Vue.use(GSignInButton);


new Vue({
    render: h => h(App)
}).$mount('#app');